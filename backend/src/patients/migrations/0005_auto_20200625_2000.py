# Generated by Django 3.0.7 on 2020-06-25 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0004_auto_20200625_1948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('U', 'Unknown')], default='U', max_length=1),
        ),
    ]
