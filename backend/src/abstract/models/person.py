from django.db import models
from abstract.fields.fields import MobileField
from django.core.validators import MinLengthValidator
from datetime import date


"""
    Custom abstract base model for any person. Has the following custom fields:
        - title (with 5 specific choices)
        - name
        - dob
        - building_details
        - lane
        - area
        - city
        - pincode
    Also derives the age from the date of birth
"""
class Person(models.Model):

    title_choices = [
        ('Dr', 'Dr.'),
        ('Mr', 'Mr.'),
        ('Mas', 'Master'),
        ('Mrs', 'Mrs.'),
        ('Ms', 'Ms.'),
    ]
    title = models.CharField(
        max_length=3,
        choices=title_choices
    )

    name = models.CharField(
        max_length=100
    )

    dob = models.DateField(
        verbose_name='Date of Birth',
        null=True,
        blank=True,
    )

    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('U', 'Unknown'),
    ]
    gender = models.CharField(
        max_length=1,
        choices=gender_choices,
        default='U',
    )

    building_details = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )

    lane = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )

    area = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )

    city = models.CharField(
        max_length=50,
        default='Mumbai',
        null=True,
        blank=True,
    )

    pincode = models.CharField(
        max_length=6,
        validators=[MinLengthValidator(6)],
        null=True,
        blank=True,
    )


    def get_age(self):
        today = date.today()
        try:
            birthday = self.dob.replace(year=today.year)    # Checking if DOB is 29th Feb
        except ValueError:
            birthday = self.dob.replace(year=today.year,
                                    month=self.dob.month + 1, day=1)

        if birthday > today:
            return today.year - self.dob.year - 1
        else:
            return today.year - self.dob.year


    def __str__(self):
        return '%s %s' % (self.get_title_display(), self.name, )


    class Meta:
        abstract = True


"""
    Custom abstract base model for a person to store mobiles. Has the following custom fields:
        - mobile (Custom MobileField in fields.py)
        - synced_with_contacts
        - hide_from_user
        
    # Make sure to add the foreign key field in the actual model
    # Override the __str__ function as this will only return the mobile number
    # Also add the unique_together variable in the Meta class wherever applicable
"""
class PersonMobile(models.Model):

    mobile = MobileField()

    synced_with_contacts = models.BooleanField(
        default=False,
        # help_text='Is the particular mobile number synced with Google Contacts',
        verbose_name='Is the mobile number synced with Google Contacts?',
    )

    hide_from_user = models.BooleanField(
        default=False,
        # help_text='User chooses to ignore syncing particular mobile number with Google Contacts',
        verbose_name='Do you want the program to ignore syncing this mobile number?',
    )


    def __str__(self):
        return self.mobile


    class Meta:
        abstract = True


"""
    Custom abstract base model for a person to store emails. Has the following custom fields:
        - email
        - synced_with_contacts
        - hide_from_user

    # Make sure to add the foreign key field in the actual model
    # Override the __str__ function as this will only return the mobile number
    # Also add the unique_together variable in the Meta class wherever applicable
"""
class PersonEmail(models.Model):

    email = models.EmailField(
        max_length=100,
    )

    synced_with_contacts = models.BooleanField(
        default=False,
        # help_text='Is the particular email synced with Google Contacts',
        verbose_name='Is the email synced with Google Contacts?',
    )

    hide_from_user = models.BooleanField(
        default=False,
        # help_text='User chooses to ignore syncing particular email with Google Contacts',
        verbose_name='Do you want the program to ignore syncing this email?',
    )


    def __str__(self):
        return self.email


    class Meta:
        abstract = True
