from django.db import models

from abstract.fields.fields import MobileField, PercentageField
from abstract.models.person import PersonAddress
from constants.maxlengths import maxlengths
from doctors.models import Doctor
from .basic_data import Consultation


class FollowUp(models.Model):
	consultation = models.OneToOneField(
		Consultation,
		on_delete=models.CASCADE,
		related_name='follow_up',
		primary_key=True,
	)

	follow_up_after = models.CharField(
		max_length=maxlengths['consultation']['follow_up'],
		verbose_name='Follow Up',
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.follow_up_after)

	class Meta:
		verbose_name = 'Follow Up'
		verbose_name_plural = 'Follow Up'


class ReferredTo(PersonAddress):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='referred_to'
	)

	doctor_name = models.CharField(
		max_length=maxlengths['person']['name'],
	)

	doctor_qualification = models.CharField(
		max_length=maxlengths['person']['qualification'],
		blank=True,
		null=True,
	)

	doctor_mobile = MobileField()

	def __str__(self):
		return '%s) %s referred to %s' % (self.consultation.id, self.consultation.patient, self.doctor_name)

	class Meta:
		unique_together = [('consultation', 'doctor_name', 'doctor_qualification')]
		verbose_name = 'Referred To'
		verbose_name_plural = 'Referred To'


class ReferredFrom(models.Model):
	consultation = models.ForeignKey(
		Consultation,
		on_delete=models.CASCADE,
		related_name='referred_from'
	)

	doctor_id = models.ForeignKey(
		Doctor,
		on_delete=models.CASCADE,
		related_name='consultations_referred'
	)

	def __str__(self):
		return '%s) %s was referred by %s' % (self.consultation.id, self.consultation.patient, self.doctor_id.name)

	class Meta:
		unique_together = [('consultation', 'doctor_id')]
		verbose_name = 'Referred From'
		verbose_name_plural = 'Referred From'


class Remarks(models.Model):
	consultation = models.OneToOneField(
		Consultation,
		on_delete=models.CASCADE,
		related_name='remarks',
		primary_key=True,
	)

	remarks = models.TextField(
		max_length=maxlengths['consultation']['remarks'],
	)

	def __str__(self):
		return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.remarks)

	class Meta:
		verbose_name = 'Remark'
		verbose_name_plural = 'Remarks'
