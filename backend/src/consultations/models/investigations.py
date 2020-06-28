from django.db import models

from .basic_data import Consultation


class InvestigationGroups(models.Model):

    investigation = models.CharField(
        max_length=50,
    )

    group_name = models.CharField(
        max_length=50,
    )


    def __str__(self):
        return '%s - %s' % (self.group_name, self.investigation)


    class Meta:
        verbose_name = 'Investigation Group'


class InvestigationDone(models.Model):

    consultation = models.ForeignKey(
        Consultation,
        on_delete=models.CASCADE,
        related_name='investigations_done'
    )

    investigation = models.CharField(
        max_length=50,
    )

    date_done = models.DateField(
        blank=True,
        null=True,
    )

    investigation_result = models.CharField(
        max_length=50,
    )

    hide_from_chart = models.BooleanField(
        default=False,
    )


    def __str__(self):
        return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.investigation)


    class Meta:
        verbose_name = 'Investigation Done'
        verbose_name_plural = 'Investigations Done'


class InvestigationPrescribed(models.Model):

    consultation = models.ForeignKey(
        Consultation,
        on_delete=models.CASCADE,
        related_name='investigations_prescribed',
    )

    investigation = models.CharField(
        max_length=50,
    )

    when_to_do = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    where_to_do = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )


    def __str__(self):
        return '%s) %s - %s' % (self.consultation.id, self.consultation.patient, self.investigation)


    class Meta:
        verbose_name = 'Investigation Prescribed'
        verbose_name_plural = 'Investigations Prescribed'





