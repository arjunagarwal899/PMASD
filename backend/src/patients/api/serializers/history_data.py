from rest_framework import serializers

from patients.api.abstract.related_fields import HistoryField
from patients.models import PatientPastHistory, PatientPersonalHistory, PatientFamilyHistory, PatientPresentHistory, \
	PatientOBGYNHistory, Patient


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
