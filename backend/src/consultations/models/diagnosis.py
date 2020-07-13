from datetime import date

from django.db import models

from .basic_data import Consultation


class Diagnosis(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='diagnosis'
	)

	diagnosis = models.CharField(
		max_length=100,
	)

	as_of = models.CharField(
		max_length=100,
		blank=True,
		null=True,
		default='As of ' + date.today().strftime('%d-%b-%Y')
	)

	description = models.TextField(
		max_length=500,
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.diagnosis)

	class Meta:
		unique_together = [('consultation', 'diagnosis')]
		verbose_name_plural = 'Diagnoses'
