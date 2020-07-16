import uuid

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from misc.models.profile import Profile
from patients.models import Patient
from .serializers import PatientSearchSerializer, PatientBasicDetailCreateSerializer, \
	PatientBasicDetailRetrieveUpdateSerializer


class PatientSearchView(ListAPIView):
	serializer_class = PatientSearchSerializer

	pagination_class = None

	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['patient_id', 'name', 'last_consultation__referred_from__doctor_id__name',
	                 'mobiles__mobile']  # TODO Add hospital to list once it has been added to backend
	ordering = ['patient_id']

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class PatientBasicDetailCreateView(CreateAPIView):
	serializer_class = PatientBasicDetailCreateSerializer

	def create(self, request, *args, **kwargs):
		request.data['user'] = request.user.pk
		return super().create(request, *args, **kwargs)


class PatientBasicDetailRetrieveUpdateView(RetrieveUpdateAPIView):
	serializer_class = PatientBasicDetailRetrieveUpdateSerializer
	lookup_field = 'patient_id'

	def get_queryset(self):
		return Patient.objects.filter(user=self.request.user)


class GeneratePatientIDView(APIView):

	def get(self, request):
		profile = Profile.objects.get(user=request.user)

		if not profile.last_patient_id.isnumeric():
			return Response({
				'new_patient_id': str(uuid.uuid4()).upper()[:6],
			})

		return Response({
			'new_patient_id': '{0:06d}'.format((int(profile.last_patient_id) + 1)),
		})


# class PatientHistoryDetailView(RetrieveUpdateDestroyAPIView):
# 	# TODO UpdateDestroy part is left
# 	serializer_class = PatientHistoryDetailSerializer
#
# 	def get_queryset(self):
# 		return Patient.objects.filter(user=self.request.user)
