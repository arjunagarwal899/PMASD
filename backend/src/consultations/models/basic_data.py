from django.db import models
from django.utils.timezone import now as django_now

from constants.maxlengths import maxlengths
from patients.models.basic_data import Patient


class Consultation(models.Model):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	# TODO: Edit model to save patient data for each consultation rather than a ForeignKey
	patient = models.ForeignKey(
		Patient,
		on_delete=models.PROTECT,
		related_name='consultations',
	)

	hospital = models.CharField(
		max_length=maxlengths['hospital'],
		default='Unknown',
	)

	professional_service = models.CharField(
		max_length=maxlengths['consultation']['professional_service'],
		default='Unknown',
	)

	online_consultation = models.BooleanField()

	consultation_date = models.DateField(
		default=django_now,
	)

	prescription_printed = models.BooleanField(
		verbose_name='Prescription to be printed? (as opposed to a digital copy)'
	)


# letterhead_template = models.ForeignKey(
#     ,
#     on_delete=models.PROTECT,
#     related_name='consultaitons',
# )

	def __str__(self):
		return '(%s) %s' % (self.consultation_date, self.patient)
