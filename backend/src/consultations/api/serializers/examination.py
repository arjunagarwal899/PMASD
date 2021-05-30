from rest_framework.serializers import ModelSerializer

from consultations.models import ExaminationMaster


class ExaminationMasterSerializer(ModelSerializer):
	class Meta:
		model = ExaminationMaster
		fields = ['id', 'examination_heading', 'examination', 'enable_basic_data_field', 'enable_reading_field', 'units',
		          'enable_description_field']
