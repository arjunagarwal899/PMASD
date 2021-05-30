from django.db import models

from constants.maxlengths import maxlengths
from .basic_data import Consultation


class InvestigationGroups(models.Model):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	investigation = models.CharField(
		max_length=maxlengths['investigation']['investigation'],
	)

	group_name = models.CharField(
		max_length=maxlengths['investigation']['group_name'],
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s - %s' % (self.group_name, self.investigation)

	class Meta:
		verbose_name = 'Investigation Group'


class InvestigationDone(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='investigations_done'
	)

	investigation = models.CharField(
		max_length=maxlengths['investigation']['investigation'],
	)

	date_done = models.DateField(
		blank=True,
		null=True,
	)

	investigation_result = models.CharField(
		max_length=maxlengths['investigation']['result'],
	)

	hide_from_chart = models.BooleanField(
		default=False,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.investigation)

	class Meta:
		verbose_name = 'Investigation Done'
		verbose_name_plural = 'Investigations Done'


class InvestigationPrescribed(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='investigations_prescribed',
	)

	investigation = models.CharField(
		max_length=maxlengths['investigation']['investigation'],
	)

	when_to_do = models.CharField(
		max_length=maxlengths['investigation']['when_to_do'],
		blank=True,
		null=True,
	)

	where_to_do = models.CharField(
		max_length=maxlengths['investigation']['where_to_do'],
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.investigation)

	class Meta:
		verbose_name = 'Investigation Prescribed'
		verbose_name_plural = 'Investigations Prescribed'
