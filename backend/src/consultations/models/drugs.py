from django.db import models

from abstract.fields.fields import PercentageField
from constants.maxlengths import maxlengths
from .basic_data import Consultation


class DrugMaster(models.Model):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	formulation_choices = [
		('Tab', 'Tablet'),
		('Cap', 'Capsule'),
		('Syr', 'Syrup'),
		('Oin', 'Ointment'),
		('Inj', 'Injection')
	]
	formulation = models.CharField(
		max_length=maxlengths['medication']['formulation'],
		choices=formulation_choices,
	)

	brand_name = models.CharField(
		max_length=maxlengths['medication']['brand_name'],
	)

	generic_name = models.CharField(
		max_length=maxlengths['medication']['generic_name'],
	)

	strength = models.CharField(
		max_length=maxlengths['medication']['strength'],
	)

	route = models.CharField(
		max_length=maxlengths['medication']['route'],
	)

	dosage_default = models.CharField(
		max_length=maxlengths['medication']['dosage'],
		blank=True,
		null=True,
	)

	meal_relation_default = models.CharField(
		max_length=maxlengths['medication']['meal_relation'],
		blank=True,
		null=True,
	)

	disabled = models.BooleanField(
		default=False,
	)

	company_name = models.CharField(
		max_length=maxlengths['medication']['company_name'],
		blank=True,
		null=True,
	)

	company_division = models.CharField(
		max_length=maxlengths['medication']['company_division'],
		blank=True,
		null=True,
	)

	group_number = models.PositiveSmallIntegerField(
		blank=True,
		null=True
	)

	number_of_times_prescribed = models.PositiveIntegerField(
		default=0,
	)

	priority_in_group = PercentageField(
		default=0,
	)

	def __str__(self):
		return '%s %s (%s)' % (self.formulation, self.brand_name, self.strength)

	class Meta:
		unique_together = [('formulation', 'brand_name', 'generic_name', 'strength', 'route')]
		verbose_name_plural = 'Drugs Master'
		verbose_name = 'Drug Master'


class DrugPrescribed(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='drugs_prescribed',
	)

	drug = models.ForeignKey(
		DrugMaster,
		on_delete=models.PROTECT,
	)

	dosage = models.CharField(
		max_length=maxlengths['medication']['dosage'],
		blank=True,
		null=True,
	)

	meal_relation = models.CharField(
		max_length=maxlengths['medication']['meal_relation'],
		blank=True,
		null=True,
	)

	duration = models.CharField(
		max_length=maxlengths['medication']['duration'],
		blank=True,
		null=True,
	)

	remarks = models.TextField(
		max_length=maxlengths['medication']['remarks'],
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.drug)

	class Meta:
		unique_together = [('consultation', 'drug')]
		verbose_name_plural = 'Drugs Prescribed'
		verbose_name = 'Drug Prescribed'
