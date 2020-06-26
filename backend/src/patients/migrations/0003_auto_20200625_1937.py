# Generated by Django 3.0.7 on 2020-06-25 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0002_auto_20200625_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientfamilyhistory',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientfamilyhistory', to='patients.Patient'),
        ),
        migrations.AlterField(
            model_name='patientobgynhistory',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientobgynhistory', to='patients.Patient'),
        ),
        migrations.AlterField(
            model_name='patientpersonalhistory',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientpersonalhistory', to='patients.Patient'),
        ),
        migrations.AlterField(
            model_name='patientpresenthistory',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientpresenthistory', to='patients.Patient'),
        ),
    ]
