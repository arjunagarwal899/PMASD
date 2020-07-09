from django.db import models

from .basic_data import Consultation
from doctors.models import Doctor
from abstract.models.person import PersonAddress
from abstract.fields.fields import MobileField, PercentageField


class FollowUp(models.Model):

    consultation = models.OneToOneField(
        Consultation,
        on_delete=models.CASCADE,
        related_name='follow_up',
        primary_key=True,
    )

    follow_up_after = models.CharField(
        max_length=50,
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
        max_length=100,
    )

    doctor_qualification = models.CharField(
        max_length=50,
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

    percentage_cut = PercentageField(
        default=0,
    )


    def __str__(self):
        return '%s) %s was referred by %s' % (self.consultation.id, self.consultation.patient, self.doctor_id.name)


    class Meta:
        unique_together = [('consultation', 'doctor_id')]
        verbose_name = 'Referred From'
        verbose_name_plural = 'Referred From'


class Remark(models.Model):

    consultation = models.OneToOneField(
        Consultation,
        on_delete=models.CASCADE,
        related_name='remarks',
        primary_key=True,
    )

    remark = models.TextField(
        max_length=300,
    )


    def __str__(self):
        return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.remark)


    class Meta:
        verbose_name = 'Remark'
        verbose_name_plural = 'Remarks'







