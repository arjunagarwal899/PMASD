from django.db import models

from .basic_data import Consultation


class GeneralAdvice(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='general_advice'
	)

	advice = models.CharField(
		max_length=50,
	)

	description = models.TextField(
		max_length=150,
		blank=True,
		null=True,
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.advice)

	class Meta:
		unique_together = [('consultation', 'advice')]
		verbose_name = 'General Advice'
		verbose_name_plural = verbose_name
