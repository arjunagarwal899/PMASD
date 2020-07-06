from django.db import models
from .basic_data import Patient

# TODO: Add docstrings
class PatientHistory(models.Model):

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='%(class)s',
    )

    timestamp = models.DateTimeField(
        auto_now_add=True,
    )

    history = models.CharField(
        max_length=100,
    )

    duration = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    description = models.TextField(
        max_length=500,
        blank=True,
        null=True,
    )


    def __str__(self):
        return '(%s) %s - %s' % (self.timestamp.date(), self.patient, self.history)


    class Meta:
        abstract = True


class PatientPastHistory(PatientHistory):
    class Meta:
        verbose_name = 'Patient (Past History)'
        verbose_name_plural = verbose_name


class PatientPersonalHistory(PatientHistory):
    class Meta:
        verbose_name = 'Patient (Personal History)'
        verbose_name_plural = verbose_name


class PatientFamilyHistory(PatientHistory):
    class Meta:
        verbose_name = 'Patient (Family History)'
        verbose_name_plural = verbose_name


class PatientPresentHistory(PatientHistory):
    class Meta:
        verbose_name = 'Patient (Present History)'
        verbose_name_plural = verbose_name


class PatientOBGYNHistory(PatientHistory):
    class Meta:
        verbose_name = 'Patient (OBGYN History)'
        verbose_name_plural = verbose_name


