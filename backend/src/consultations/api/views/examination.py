from rest_framework.viewsets import ModelViewSet

from consultations.api.serializers.examination import ExaminationMasterSerializer
from consultations.models import ExaminationMaster


class ExaminationMasterView(ModelViewSet):
	serializer_class = ExaminationMasterSerializer

	def get_queryset(self):
		return ExaminationMaster.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)