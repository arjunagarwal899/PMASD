from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.doctors import DoctorSerializer, Doctor


class DoctorView(APIView):

	def get(self, request):
		doctors = Doctor.objects.all()
		serializer = DoctorSerializer(doctors, many=True)

		return Response(serializer.data)
