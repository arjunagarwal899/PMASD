# Generated by Django 3.0.7 on 2020-07-14 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0004_auto_20200714_2240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='patient_id',
            field=models.CharField(max_length=6, verbose_name='Patient ID'),
        ),
    ]
