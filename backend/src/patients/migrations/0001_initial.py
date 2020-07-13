# Generated by Django 3.0.7 on 2020-07-13 09:01

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models

import abstract.fields.fields


class Migration(migrations.Migration):
	initial = True

	dependencies = [
		('consultations', '0001_initial'),
	]

	operations = [
		migrations.CreateModel(
			name='Patient',
			fields=[
				('building_details', models.CharField(blank=True, max_length=50, null=True)),
				('lane', models.CharField(blank=True, max_length=50, null=True)),
				('area', models.CharField(blank=True, max_length=50, null=True)),
				('city', models.CharField(blank=True, default='Mumbai', max_length=50, null=True)),
				('pincode', models.CharField(blank=True, max_length=6, null=True,
				                             validators=[django.core.validators.MinLengthValidator(6)])),
				('title', models.CharField(
					choices=[('Dr', 'Dr.'), ('Mr', 'Mr.'), ('Mas', 'Master'), ('Mrs', 'Mrs.'), ('Ms', 'Ms.')],
					max_length=3)),
				('name', models.CharField(max_length=100)),
				('dob', models.DateField(blank=True, null=True, verbose_name='Date of Birth')),
				('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('U', 'Unknown')], default='U',
				                            max_length=1)),
				('patient_id', models.CharField(max_length=6, primary_key=True, serialize=False)),
				('last_consultation',
				 models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
				                      related_name='last_consultation_for_patient', to='consultations.Consultation')),
			],
			options={
				'abstract': False,
			},
		),
		migrations.CreateModel(
			name='PatientPresentHistory',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('timestamp', models.DateTimeField(auto_now_add=True)),
				('history', models.CharField(max_length=100)),
				('duration', models.CharField(blank=True, max_length=100, null=True)),
				('description', models.TextField(blank=True, max_length=500, null=True)),
				('patient',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientpresenthistory',
				                   to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Present History)',
				'verbose_name_plural': 'Patient (Present History)',
			},
		),
		migrations.CreateModel(
			name='PatientPersonalHistory',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('timestamp', models.DateTimeField(auto_now_add=True)),
				('history', models.CharField(max_length=100)),
				('duration', models.CharField(blank=True, max_length=100, null=True)),
				('description', models.TextField(blank=True, max_length=500, null=True)),
				('patient',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientpersonalhistory',
				                   to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Personal History)',
				'verbose_name_plural': 'Patient (Personal History)',
			},
		),
		migrations.CreateModel(
			name='PatientPastHistory',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('timestamp', models.DateTimeField(auto_now_add=True)),
				('history', models.CharField(max_length=100)),
				('duration', models.CharField(blank=True, max_length=100, null=True)),
				('description', models.TextField(blank=True, max_length=500, null=True)),
				('patient',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientpasthistory',
				                   to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Past History)',
				'verbose_name_plural': 'Patient (Past History)',
			},
		),
		migrations.CreateModel(
			name='PatientOBGYNHistory',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('timestamp', models.DateTimeField(auto_now_add=True)),
				('history', models.CharField(max_length=100)),
				('duration', models.CharField(blank=True, max_length=100, null=True)),
				('description', models.TextField(blank=True, max_length=500, null=True)),
				('patient',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientobgynhistory',
				                   to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (OBGYN History)',
				'verbose_name_plural': 'Patient (OBGYN History)',
			},
		),
		migrations.CreateModel(
			name='PatientFamilyHistory',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('timestamp', models.DateTimeField(auto_now_add=True)),
				('history', models.CharField(max_length=100)),
				('duration', models.CharField(blank=True, max_length=100, null=True)),
				('description', models.TextField(blank=True, max_length=500, null=True)),
				('patient',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientfamilyhistory',
				                   to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Family History)',
				'verbose_name_plural': 'Patient (Family History)',
			},
		),
		migrations.CreateModel(
			name='PatientMobile',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('mobile', abstract.fields.fields.MobileField(max_length=11)),
				('synced_with_contacts',
				 models.BooleanField(default=False, verbose_name='Is the mobile number synced with Google Contacts?')),
				('hide_from_user', models.BooleanField(default=False,
				                                       verbose_name='Do you want the program to ignore syncing this mobile number?')),
				('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mobiles',
				                              to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Mobile)',
				'verbose_name_plural': 'Patient (Mobiles)',
				'unique_together': {('patient', 'mobile')},
			},
		),
		migrations.CreateModel(
			name='PatientEmail',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('email', models.EmailField(max_length=100)),
				('synced_with_contacts',
				 models.BooleanField(default=False, verbose_name='Is the email synced with Google Contacts?')),
				('hide_from_user', models.BooleanField(default=False,
				                                       verbose_name='Do you want the program to ignore syncing this email?')),
				('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emails',
				                              to='patients.Patient')),
			],
			options={
				'verbose_name': 'Patient (Email)',
				'verbose_name_plural': 'Patient (Emails)',
				'unique_together': {('patient', 'email')},
			},
		),
	]
