# Generated by Django 3.0.7 on 2020-07-30 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultations', '0003_auto_20200725_1707'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Remark',
            new_name='Remarks',
        ),
        migrations.RenameField(
            model_name='remarks',
            old_name='remark',
            new_name='remarks',
        ),
        migrations.RemoveField(
            model_name='referredfrom',
            name='percentage_cut',
        ),
        migrations.AddField(
            model_name='consultation',
            name='hospital',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AddField(
            model_name='consultation',
            name='online_consultation',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='consultation',
            name='professional_service',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AlterField(
            model_name='diagnosis',
            name='as_of',
            field=models.CharField(blank=True, default='As of 30-Jul-2020', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='drugmaster',
            name='formulation',
            field=models.CharField(choices=[('Tab', 'Tablet'), ('Cap', 'Capsule'), ('Syr', 'Syrup'), ('Oin', 'Ointment'), ('Inj', 'Injection')], max_length=5),
        ),
    ]
