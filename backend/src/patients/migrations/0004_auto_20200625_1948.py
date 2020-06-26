# Generated by Django 3.0.7 on 2020-06-25 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0003_auto_20200625_1937'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patientfamilyhistory',
            options={'verbose_name': 'Patient (Family History)', 'verbose_name_plural': 'Patient (Family History)'},
        ),
        migrations.AlterModelOptions(
            name='patientobgynhistory',
            options={'verbose_name': 'Patient (OBGYN History)', 'verbose_name_plural': 'Patient (OBGYN History)'},
        ),
        migrations.AlterModelOptions(
            name='patientpasthistory',
            options={'verbose_name': 'Patient (Past History)', 'verbose_name_plural': 'Patient (Past History)'},
        ),
        migrations.AlterModelOptions(
            name='patientpersonalhistory',
            options={'verbose_name': 'Patient (Personal History)', 'verbose_name_plural': 'Patient (Personal History)'},
        ),
        migrations.AlterModelOptions(
            name='patientpresenthistory',
            options={'verbose_name': 'Patient (Present History)', 'verbose_name_plural': 'Patient (Present History)'},
        ),
    ]
