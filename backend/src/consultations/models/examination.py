from django.db import models

from constants.maxlengths import maxlengths
from .basic_data import Consultation


class ExaminationMaster(models.Model):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	examination_heading = models.CharField(
		max_length=maxlengths['consultation']['examination']['examination_heading'],
	)

	examination = models.CharField(
		max_length=maxlengths['consultation']['examination']['examination'],
	)

	enable_basic_data_field = models.BooleanField()

	enable_reading_field = models.BooleanField()

	units = models.CharField(
		max_length=maxlengths['consultation']['examination']['reading_units'],
		blank=True,
		null=True,
	)

	enable_description_field = models.BooleanField()

	def __str__(self):
		return self.examination

	class Meta:
		unique_together = [('examination_heading', 'examination')]
		verbose_name_plural = 'Examinations Master'
		verbose_name = 'Examination Master'


class ExaminationDone(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='examination',
	)

	examination_heading = models.CharField(
		max_length=maxlengths['consultation']['examination']['examination_heading'],
	)

	examination = models.CharField(
		max_length=maxlengths['consultation']['examination']['examination'],
	)

	basic_info = models.CharField(
		max_length=maxlengths['consultation']['examination']['basic_info'],
		blank=True,
		null=True,
	)

	reading = models.CharField(
		max_length=maxlengths['consultation']['examination']['reading'],
		blank=True,
		null=True,
	)

	units = models.CharField(
		max_length=maxlengths['consultation']['examination']['reading_units'],
		blank=True,
		null=True,
	)

	description = models.TextField(
		max_length=maxlengths['consultation']['examination']['description'],
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.examination)

	class Meta:
		unique_together = [('consultation', 'examination_heading', 'examination')]
		verbose_name_plural = 'Examinations Done'
		verbose_name = 'Examination Done'
