# Generated by Django 3.0.7 on 2020-07-25 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0005_auto_20200714_2324'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patientfamilyhistory',
            old_name='timestamp',
            new_name='created',
        ),
        migrations.RenameField(
            model_name='patientobgynhistory',
            old_name='timestamp',
            new_name='created',
        ),
        migrations.RenameField(
            model_name='patientpasthistory',
            old_name='timestamp',
            new_name='created',
        ),
        migrations.RenameField(
            model_name='patientpersonalhistory',
            old_name='timestamp',
            new_name='created',
        ),
        migrations.RenameField(
            model_name='patientpresenthistory',
            old_name='timestamp',
            new_name='created',
        ),
    ]