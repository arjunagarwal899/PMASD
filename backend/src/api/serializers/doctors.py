from rest_framework import serializers
from doctors.models import Doctor, DoctorEmail, DoctorMobile


class DoctorMobileSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorMobile
        fields = '__all__'


class DoctorEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorEmail
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    mobiles = DoctorMobileSerializer(many=True)
    emails = DoctorEmailSerializer(many=True)
    title = serializers.StringRelatedField(source='get_title_display')


    class Meta:
        model = Doctor
        fields = '__all__'

