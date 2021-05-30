from rest_framework.exceptions import NotFound
from rest_framework.viewsets import ModelViewSet

from patients.api.serializers import PatientFamilyHistorySerializer, PatientOBGYNHistorySerializer, \
	PatientPastHistorySerializer, PatientPersonalHistorySerializer, PatientPresentHistorySerializer
from patients.models import PatientPastHistory, PatientPersonalHistory, PatientFamilyHistory, PatientPresentHistory, \
	PatientOBGYNHistory, Patient


# class PatientHistoryRetrieveUpdateView(ListAPIView):
# 	serializer_class = PatientHistoryDetailSerializer
#
# 	def get_queryset(self):
# 		if not self.kwargs['history_type']:
# 			return None
#
# 		filterCriteria = {
# 			'patient__user':self.request.user,
# 			'patient__patient_id': self.kwargs['patient_id'],
# 		}
#
# 		if self.kwargs['history_type'] == 'past':
# 			return PatientPastHistory.objects.filter(**filterCriteria)
# 		elif self.kwargs['history_type'] == 'personal':
# 			return PatientPersonalHistory.objects.filter(**filterCriteria)
# 		elif self.kwargs['history_type'] == 'family':
# 			return PatientFamilyHistory.objects.filter(**filterCriteria)
# 		elif self.kwargs['history_type'] == 'present':
# 			return PatientPresentHistory.objects.filter(**filterCriteria)
# 		elif self.kwargs['history_type'] == 'obgyn':
# 			return PatientOBGYNHistory.objects.filter(**filterCriteria)
# 		else:
# 			return None


class PatientHistoryRetrieveUpdateViewSet(ModelViewSet):

	def _get_model_or_serializer(self, model_or_serializer):
		model_and_serializer = ()
		if self.kwargs['history_type'] == 'past':
			model_and_serializer = PatientPastHistory, PatientPastHistorySerializer
		elif self.kwargs['history_type'] == 'personal':
			model_and_serializer = PatientPersonalHistory, PatientPersonalHistorySerializer
		elif self.kwargs['history_type'] == 'family':
			model_and_serializer = PatientFamilyHistory, PatientFamilyHistorySerializer
		elif self.kwargs['history_type'] == 'present':
			model_and_serializer = PatientPresentHistory, PatientPresentHistorySerializer
		elif self.kwargs['history_type'] == 'obgyn':
			model_and_serializer = PatientOBGYNHistory, PatientOBGYNHistorySerializer
		else:
			return None

		if model_or_serializer == 'model':
			return model_and_serializer[0]
		elif model_or_serializer == 'serializer':
			return model_and_serializer[1]
		else:
			return None


	def get_queryset(self):

		filterCriteria = {
			'patient__user': self.request.user,
			'patient__patient_id': self.kwargs['patient_id'],
		}
		if self.request.method in ['GET', 'POST']:
			pass
		elif self.request.method in ['PATCH', 'DELETE']:
			filterCriteria['pk'] = self.kwargs['pk']

		model = self._get_model_or_serializer('model')
		if model is not None:
			records = model.objects.filter(**filterCriteria)
			if not records.count() and self.request.method in ['PATCH', 'DELETE']:
				raise NotFound('Record(s) does not exist')

			return records
		else:
			return None


	def get_serializer_class(self):
		return self._get_model_or_serializer('serializer')


	# Listing all history items of a particular history type
	def list(self, request, *args, **kwargs):
		return super().list(request, *args, **kwargs)


	# Adding a single new history item to a particular history type
	def create(self, request, *args, **kwargs):
		return super().create(request, *args, **kwargs)

	# Adding foreign key details before saving to database
	def perform_create(self, serializer):
		patient = Patient.objects.get(patient_id=self.kwargs['patient_id'], user=self.request.user)
		serializer.save(patient=patient)


	# # Updating a single history item of a particular history type. Following functionality can be added later if needed.
	# def partial_update(self, request, *args, **kwargs):
	# 	return super().partial_update(request, *args, **kwargs)


	# Deleting a certain history item of a particular history type
	def destroy(self, request, *args, **kwargs):
		return super().destroy(request, *args, **kwargs)
