import uuid

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from misc.models.profiles import Profile
from patients.api.serializers import PatientSearchSerializer, PatientBasicCreateSerializer, \
	PatientBasicRetrieveUpdateSerializer
from patients.models import Patient


class PatientSearchView(ListAPIView):
	serializer_class = PatientSearchSerializer

	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['patient_id', 'name', 'last_consultation__referred_from__doctor_id__name', 'last_consultation__hospital',
	                 'mobiles__mobile']
	ordering = ['patient_id']

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class PatientBasicCreateView(CreateAPIView):
	serializer_class = PatientBasicCreateSerializer

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

		user_profile = self.request.user.profile
		user_profile.last_patient_id = serializer.data['patient_id']
		user_profile.save()


class PatientBasicRetrieveUpdateView(RetrieveUpdateAPIView):
	serializer_class = PatientBasicRetrieveUpdateSerializer
	lookup_field = 'patient_id'

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class GeneratePatientIDView(APIView):

	def get(self, request):
		profile = Profile.objects.get(user=request.user)

		if not profile.last_patient_id.isnumeric():
			while True:
				random_patient_id = str(uuid.uuid4()).upper()[:6]
				if not Patient.objects.filter(patient_id=random_patient_id).exists():
					break

			return Response({
				'new_patient_id': random_patient_id,
			})

		new_patient_id = '{0:06d}'.format(int(profile.last_patient_id))
		while True:
			new_patient_id = '{0:06d}'.format((int(new_patient_id) + 1))
			if not Patient.objects.filter(patient_id=new_patient_id).exists():
				break

		return Response({
			'new_patient_id': new_patient_id,
		})


