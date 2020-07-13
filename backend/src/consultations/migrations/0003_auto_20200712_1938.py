# Generated by Django 3.0.7 on 2020-07-12 14:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('consultations', '0002_auto_20200712_1923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referredfrom',
            name='consultation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='referred_from', to='consultations.Consultation', unique=True),
        ),
    ]
