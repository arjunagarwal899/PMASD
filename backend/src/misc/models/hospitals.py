from django.db import models

from constants.maxlengths import maxlengths


class Hospital(models.Model):

	hospital = models.CharField(
		max_length=maxlengths['hospital'],
	)

	def __str__(self):
		return self.hospital


	class Meta:
		db_table = 'hospitals_hospital'