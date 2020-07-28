from rest_framework import serializers

from patients.models import *


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

	@staticmethod
	def vet_data(data):
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

		return data


	class Meta:
		model = Patient


class PatientBasicDetailCreateSerializer(PatientBasicDetailSerializer):

	def create(self, validated_data):
		mobiles = []
		if 'mobiles' in validated_data.keys(): mobiles = validated_data.pop('mobiles')

		emails = []
		if 'emails' in validated_data.keys(): emails = validated_data.pop('emails')

		patient = super().create(validated_data)

		for mobile in mobiles:
			PatientMobile(patient_id=patient.pk, **mobile).save()

		for email in emails:
			PatientEmail(patient_id=patient.pk, **email).save()

		return patient


	def to_internal_value(self, data):
		data = PatientBasicDetailSerializer.vet_data(data)
		return super().to_internal_value(data)


	class Meta(PatientBasicDetailSerializer.Meta):
		fields = [
			'patient_id', 'user', 'title', 'name', 'dob', 'gender',
			'building_details', 'lane', 'area', 'city', 'pincode', 'last_consultation',
			'mobiles', 'emails',
		]


class PatientBasicDetailRetrieveUpdateSerializer(PatientBasicDetailSerializer):
	age = serializers.IntegerField(
		source='get_age',
		read_only=True,
	)

	def update(self, instance, validated_data):
		mobiles = []
		if 'mobiles' in validated_data.keys(): mobiles = validated_data.pop('mobiles')

		emails = []
		if 'emails' in validated_data.keys(): emails = validated_data.pop('emails')

		patient = super().update(instance, validated_data)

		existing_mobiles = PatientMobile.objects.filter(patient_id=instance.pk)
		existing_mobiles.delete()
		del existing_mobiles
		if mobiles:
			for mobile in mobiles:
				new_mobile = PatientMobile(patient_id=instance.pk, **mobile)
				new_mobile.save()

		existing_emails = PatientEmail.objects.filter(patient_id=instance.pk)
		existing_emails.delete()
		del existing_emails
		if emails:
			for email in emails:
				new_email = PatientEmail(patient_id=instance.pk, **email)
				new_email.save()

		return patient


	def to_internal_value(self, data):
		data = PatientBasicDetailSerializer.vet_data(data)

		return super().to_internal_value(data)


	class Meta(PatientBasicDetailSerializer.Meta):
		fields = [
			'patient_id', 'title', 'name', 'dob', 'age', 'gender',
			'building_details', 'lane', 'area', 'city', 'pincode', 'last_consultation',
			'mobiles', 'emails',
		]
		read_only_fields = ['patient_id', 'last_consultation', 'age']


class PatientUpdateLastConsultation(serializers.ModelSerializer):
	class Meta:
		model = Patient
		fields = ['last_consultation']
