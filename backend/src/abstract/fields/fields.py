from django.db import models
from django.core.exceptions import ValidationError


"""
    # Custom field to store mobile numbers in the database. Derived from CharField
"""
class MobileField(models.CharField):

    description = 'Mobile number in Indian format'


    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 11        # 11 digits and not 10 because 022 26255848 (Ignore space)
        super().__init__(*args, **kwargs)
        self.validators.append(self.check_if_mobile_number)


    @staticmethod
    def check_if_mobile_number(value):
        if not value.isnumeric():
            raise ValidationError('Entered field is not a valid mobile number')

        return value
