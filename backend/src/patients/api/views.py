from patients.models import Patient
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import PatientSearchSerializer, PatientBasicDetailSerializer, PatientHistoryDetailSerializer


class PatientSearchView(ListAPIView):
	queryset = Patient.objects.all()
	serializer_class = PatientSearchSerializer

	pagination_class = None

	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['patient_id', 'name', 'mobiles__mobile']
	ordering = ['patient_id']


class PatientBasicDetailView(RetrieveUpdateAPIView):
	queryset = Patient.objects.all()
	serializer_class = PatientBasicDetailSerializer


class PatientHistoryDetailView(RetrieveUpdateDestroyAPIView):
	# TODO UpdateDestroy part is left
	queryset = Patient.objects.all()
	serializer_class = PatientHistoryDetailSerializer
