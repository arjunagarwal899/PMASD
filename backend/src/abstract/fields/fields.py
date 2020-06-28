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
        self.validators.append(MobileField.check_if_mobile_number)


    @staticmethod
    def check_if_mobile_number(value):
        if not value.isnumeric():
            raise ValidationError('Entered value is not a valid mobile number')

        return value


class PercentageField(models.PositiveSmallIntegerField):

    description = 'Percentage value between 0 and 100'


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.validators.append(PercentageField.check_if_percentage)


    @staticmethod
    def check_if_percentage(value):
        if not 0 <= value <= 100:
            raise ValidationError('Entered value is not a valid percentage')

        return value

