from django.db import models

from constants.maxlengths import maxlengths
from .basic_data import Patient


class PatientHistory(models.Model):
	patient = models.ForeignKey(
		Patient,
		on_delete=models.CASCADE,
		related_name='%(class)s',
	)

	created = models.DateTimeField(
		auto_now_add=True,
	)

	history = models.CharField(
		max_length=maxlengths['person']['patient']['history']['history'],
	)

	duration = models.CharField(
		max_length=maxlengths['person']['patient']['history']['duration'],
		blank=True,
		null=True,
	)

	description = models.TextField(
		max_length=maxlengths['person']['patient']['history']['description'],
		blank=True,
		null=True,
	)

	def __str__(self):
		return '(%s) %s - %s' % (self.created.date(), self.patient, self.history)

	class Meta:
		abstract = True


class PatientPastHistory(PatientHistory):
	class Meta:
		verbose_name = 'Patient (Past History)'
		verbose_name_plural = verbose_name


class PatientPersonalHistory(PatientHistory):
	class Meta:
		verbose_name = 'Patient (Personal History)'
		verbose_name_plural = verbose_name


class PatientFamilyHistory(PatientHistory):
	class Meta:
		verbose_name = 'Patient (Family History)'
		verbose_name_plural = verbose_name


class PatientPresentHistory(PatientHistory):
	class Meta:
		verbose_name = 'Patient (Present History)'
		verbose_name_plural = verbose_name


class PatientOBGYNHistory(PatientHistory):
	class Meta:
		verbose_name = 'Patient (OBGYN History)'
		verbose_name_plural = verbose_name
