from rest_framework import serializers

from patients.models import *
from .abstract.related_fields import HistoryField


class PatientMobileSerializer(serializers.ModelSerializer):
	class Meta:
		model = PatientMobile
		fields = ['mobile', 'synced_with_contacts', 'hide_from_user']


class PatientEmailSerializer(serializers.ModelSerializer):
	class Meta:
		model = PatientEmail
		fields = ['email', 'synced_with_contacts', 'hide_from_user']


# TODO 4-Jul: Add docstrings
class PatientSearchSerializer(serializers.ModelSerializer):
	mobiles = serializers.SlugRelatedField(
		many=True,
		read_only=True,
		slug_field='mobile',
	)

	doctor_names = serializers.SerializerMethodField()

	def get_doctor_names(self, patient):
		doctor_names = []
		last_consultation = patient.last_consultation
		if last_consultation:
			referrals = last_consultation.referred_from.all()
			for referral in referrals:
				doctor_names.append(referral.doctor_id.name)

		return doctor_names

	hospital = serializers.SerializerMethodField()

	def get_hospital(self, patient):
		return "add hospital capabilities"  # TODO Add hospital in consultation

	class Meta:
		model = Patient
		fields = ['patient_id', 'name', 'doctor_names', 'hospital', 'mobiles']


class PatientBasicDetailSerializer(serializers.ModelSerializer):
	mobiles = PatientMobileSerializer(
		many=True,
		required=False,
	)

	emails = PatientEmailSerializer(
		many=True,
		required=False,
	)

	age = serializers.IntegerField(
		source='get_age',
		required=False,
	)

	def to_internal_value(self, data):
		if 'title' in data.keys():
			title = data['title']
			for title_choice in Patient.title_choices:
				if title == title_choice[0]:
					break
				elif title == title_choice[1]:
					data['title'] = title_choice[0]
					break

		if 'gender' in data.keys():
			gender = data['gender']
			for gender_choice in Patient.gender_choices:
				if gender == gender_choice[0]:
					break
				elif gender == gender_choice[1]:
					data['gender'] = gender_choice[0]
					break

		return super().to_internal_value(data)

	def update(self, instance, validated_data):

		mobiles = None
		if 'mobiles' in validated_data.keys():
			mobiles = validated_data.pop('mobiles')

		emails = None
		if 'emails' in validated_data.keys():
			emails = validated_data.pop('emails')

			existing_emails = PatientEmail.objects.filter(patient_id=instance.pk)
			existing_emails.delete()
			del existing_emails

			for email in emails:
				new_email = PatientEmail(patient_id=instance.pk, **email)
				new_email.save()

		patient = super().update(instance, validated_data)

		if mobiles is not None:
			existing_mobiles = PatientMobile.objects.filter(patient_id=instance.pk)
			existing_mobiles.delete()
			del existing_mobiles

			for mobile in mobiles:
				new_mobile = PatientMobile(patient_id=instance.pk, **mobile)
				new_mobile.save()

		if emails is not None:
			existing_emails = PatientEmail.objects.filter(patient_id=instance.pk)
			existing_emails.delete()
			del existing_emails

			for email in emails:
				new_email = PatientEmail(patient_id=instance.pk, **email)
				new_email.save()

		return patient

	class Meta:
		model = Patient
		fields = [
			'title', 'name', 'dob', 'age', 'gender',
			'building_details', 'lane', 'area', 'city', 'pincode', 'last_consultation',
			'mobiles', 'emails',
		]


class PatientHistoryDetailSerializer(serializers.ModelSerializer):
	patientpasthistory = HistoryField(
		queryset=PatientPastHistory.objects.all(),
		many=True,
	)

	patientpersonalhistory = HistoryField(
		queryset=PatientPersonalHistory.objects.all(),
		many=True,
	)

	patientfamilyhistory = HistoryField(
		queryset=PatientFamilyHistory.objects.all(),
		many=True,
	)

	patientpresenthistory = HistoryField(
		queryset=PatientPresentHistory.objects.all(),
		many=True,
	)

	patientobgynhistory = HistoryField(
		queryset=PatientOBGYNHistory.objects.all(),
		many=True,
	)

	class Meta:
		model = Patient
		fields = [
			'patient_id',
			'patientpasthistory',
			'patientpersonalhistory',
			'patientfamilyhistory',
			'patientpresenthistory',
			'patientobgynhistory',
		]
