from django.core.validators import MaxValueValidator
from django.db import models

class Profile(models.Model):

	user = models.OneToOneField(
		'auth.User',
		on_delete=models.CASCADE,
	)

	last_patient_id = models.CharField(
		max_length=6,
		default='000000',
	)

	def __str__(self):
		return self.user.username

	class Meta:
		pass