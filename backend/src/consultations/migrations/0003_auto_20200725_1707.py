# Generated by Django 3.0.7 on 2020-07-25 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultations', '0002_auto_20200714_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diagnosis',
            name='as_of',
            field=models.CharField(blank=True, default='As of 25-Jul-2020', max_length=100, null=True),
        ),
    ]
