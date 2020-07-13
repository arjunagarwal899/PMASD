from patients.models import Patient
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import PatientSearchSerializer, PatientBasicDetailSerializer, PatientHistoryDetailSerializer


class PatientSearchView(ListAPIView):
	serializer_class = PatientSearchSerializer

	pagination_class = None

	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['patient_id', 'name', 'last_consultation__referred_from__doctor_id__name', 'mobiles__mobile']      # TODO Add hospital to list once it has been added to backend
	ordering = ['patient_id']

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class PatientBasicDetailView(RetrieveUpdateAPIView):
	serializer_class = PatientBasicDetailSerializer

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class PatientHistoryDetailView(RetrieveUpdateDestroyAPIView):
	# TODO UpdateDestroy part is left
	serializer_class = PatientHistoryDetailSerializer

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)
