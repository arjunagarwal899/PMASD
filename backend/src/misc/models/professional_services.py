from django.db import models

from constants.maxlengths import maxlengths


class ProfessionalService(models.Model):
	professional_service = models.CharField(
		max_length=maxlengths['consultation']['professional_service'],
	)

	def __str__(self):
		return self.professional_service

