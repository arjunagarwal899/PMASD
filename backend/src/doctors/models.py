from django.db import models

from abstract.models.person import Person, PersonMobile, PersonEmail
from constants.maxlengths import maxlengths


class Doctor(Person):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	qualification = models.CharField(
		max_length=maxlengths['person']['qualification'],
		null=True,
		blank=True,
	)

	designation = models.CharField(
		max_length=maxlengths['person']['designation'],
		null=True,
		blank=True,
	)


class DoctorMobile(PersonMobile):
	doctor = models.ForeignKey(
		Doctor,
		on_delete=models.CASCADE,
		related_name='mobiles',
	)

	def __str__(self):
		return '%s (%s)' % (self.doctor, self.mobile)

	class Meta:
		verbose_name = 'Doctor (Mobile)'
		verbose_name_plural = 'Doctor (Mobiles)'
		unique_together = ['doctor', 'mobile']


class DoctorEmail(PersonEmail):
	doctor = models.ForeignKey(
		Doctor,
		on_delete=models.CASCADE,
		related_name='emails',
	)

	def __str__(self):
		return '%s (%s)' % (self.doctor, self.email)

	class Meta:
		verbose_name = 'Doctor (Email)'
		verbose_name_plural = 'Doctor (Emails)'
		unique_together = ['doctor', 'email']
