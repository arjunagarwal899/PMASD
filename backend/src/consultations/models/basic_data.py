from django.db import models
from django.utils.timezone import now as django_now

from patients.models.basic_data import Patient


class Consultation(models.Model):
    # TODO: Edit to save patient data for each consultation
    patient = models.ForeignKey(
        Patient,
        on_delete=models.PROTECT,
        related_name='consultations',
    )

    consultation_date = models.DateField(
        default=django_now,
    )

    prescription_printed = models.BooleanField(
        verbose_name='Prescription to be printed? (as opposed to a digital copy)'
    )

    # letterhead_template = models.ForeignKey(
    #     ,
    #     on_delete=models.PROTECT,
    #     related_name='consultaitons',
    # )


    def __str__(self):
        return '(%s) %s' % (self.consultation_date, self.patient)














