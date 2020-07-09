# Generated by Django 3.0.7 on 2020-06-24 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0003_auto_20200624_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctoremail',
            name='hide_from_user',
            field=models.BooleanField(default=False, verbose_name='Do you want the program to ignore syncing this email?'),
        ),
        migrations.AlterField(
            model_name='doctoremail',
            name='synced_with_contacts',
            field=models.BooleanField(default=False, verbose_name='Is the email synced with Google Contacts?'),
        ),
        migrations.AlterField(
            model_name='doctormobile',
            name='hide_from_user',
            field=models.BooleanField(default=False, verbose_name='Do you want the program to ignore syncing this mobile number?'),
        ),
        migrations.AlterField(
            model_name='doctormobile',
            name='synced_with_contacts',
            field=models.BooleanField(default=False, verbose_name='Is the mobile number synced with Google Contacts?'),
        ),
    ]
