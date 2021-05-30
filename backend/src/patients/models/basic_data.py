from django.db import models

from abstract.models.person import Person, PersonMobile, PersonEmail
from constants.maxlengths import maxlengths


class Patient(Person):
	user = models.ForeignKey(
		'auth.User',
		on_delete=models.CASCADE,
	)

	# Patient ID is not the primary key as they can be the same for two different users
	patient_id = models.CharField(
		max_length=maxlengths['person']['patient']['patient_id'],
		verbose_name='Patient ID',
	)

	last_consultation = models.OneToOneField(
		'consultations.Consultation',
		on_delete=models.SET_NULL,
		blank=True,
		null=True,
		related_name='last_consultation_for_patient',
	)

	class Meta:
		unique_together = [('user', 'patient_id')]


class PatientMobile(PersonMobile):
	patient = models.ForeignKey(
		Patient,
		on_delete=models.CASCADE,
		related_name='mobiles'
	)

	def __str__(self):
		return '%s (%s)' % (self.patient, self.mobile)

	class Meta:
		verbose_name = 'Patient (Mobile)'
		verbose_name_plural = 'Patient (Mobiles)'
		unique_together = ['patient', 'mobile']


class PatientEmail(PersonEmail):
	patient = models.ForeignKey(
		Patient,
		on_delete=models.CASCADE,
		related_name='emails'
	)

	def __str__(self):
		return '%s (%s)' % (self.patient, self.email)

	class Meta:
		verbose_name = 'Patient (Email)'
		verbose_name_plural = 'Patient (Emails)'
		unique_together = ['patient', 'email']
