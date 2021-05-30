from django.db import models

from constants.maxlengths import maxlengths


class Profile(models.Model):
	user = models.OneToOneField(
		'auth.User',
		on_delete=models.CASCADE,
		related_name='profile',
	)

	last_patient_id = models.CharField(
		max_length=maxlengths['person']['patient']['patient_id'],
		default='000000',
	)

	def __str__(self):
		return self.user.username

	class Meta:
		db_table = 'userprofile'
