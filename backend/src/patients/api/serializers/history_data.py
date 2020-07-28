from rest_framework.serializers import ModelSerializer

from patients.models import PatientPastHistory, PatientFamilyHistory, PatientPresentHistory, PatientOBGYNHistory, \
	PatientPersonalHistory


default_history_fields = ['id', 'created', 'history', 'duration', 'description']


class PatientPastHistorySerializer(ModelSerializer):
	class Meta:
		model = PatientPastHistory
		fields = default_history_fields


class PatientPersonalHistorySerializer(ModelSerializer):
	class Meta:
		model = PatientPersonalHistory
		fields = default_history_fields


class PatientPresentHistorySerializer(ModelSerializer):
	class Meta:
		model = PatientPresentHistory
		fields = default_history_fields


class PatientFamilyHistorySerializer(ModelSerializer):
	class Meta:
		model = PatientFamilyHistory
		fields = default_history_fields


class PatientOBGYNHistorySerializer(ModelSerializer):
	class Meta:
		model = PatientOBGYNHistory
		fields = default_history_fields
