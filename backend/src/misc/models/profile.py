from django.db import models

class Profile(models.Model):

	user = models.OneToOneField(
		'auth.User',
		on_delete=models.CASCADE,
		related_name='profile',
	)

	last_patient_id = models.CharField(
		max_length=6,
		default='000000',
	)

	def __str__(self):
		return self.user.username

	class Meta:
		pass