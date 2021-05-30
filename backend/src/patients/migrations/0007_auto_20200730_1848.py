# Generated by Django 3.0.7 on 2020-07-30 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0006_auto_20200725_1707'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='title',
            field=models.CharField(choices=[('Dr', 'Dr.'), ('Mr', 'Mr.'), ('Mas', 'Master'), ('Mrs', 'Mrs.'), ('Ms', 'Ms.')], max_length=5),
        ),
    ]
