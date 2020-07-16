from django.urls import path

from patients.api.views import PatientSearchView, PatientBasicDetailRetrieveUpdateView, PatientBasicDetailCreateView, \
	GeneratePatientIDView


urlpatterns = [
	path('search/', PatientSearchView.as_view(), name='patient_search'),

	path('basic/', PatientBasicDetailCreateView.as_view(), name='patient_basic_create'),
	path('basic/<str:patient_id>/', PatientBasicDetailRetrieveUpdateView.as_view(), name='patient_basic_detail'),
	path('newid/', GeneratePatientIDView.as_view(), name='generate_new_patient_id')
	# path('history/<str:patient_id>/', PatientHistoryDetailView.as_view(), name='patient_history_detail'),

]
