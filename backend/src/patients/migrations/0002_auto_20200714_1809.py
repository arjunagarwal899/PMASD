# Generated by Django 3.0.7 on 2020-07-14 12:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='patient_id',
            new_name='ud_patient_id',
        ),
    ]
