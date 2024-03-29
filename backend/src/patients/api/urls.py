from django.urls import path

from patients.api.views import PatientSearchView, PatientBasicRetrieveUpdateView, PatientBasicCreateView, \
	GeneratePatientIDView, PatientHistoryRetrieveUpdateViewSet


urlpatterns = [
	# Search for an existing patient
	path('search/', PatientSearchView.as_view(), name='patient_search'),

	# Generate a new patient ID
	path('newid/', GeneratePatientIDView.as_view(), name='generate_new_patient_id'),

	# API endpoints for patient basic details
	path('basic/', PatientBasicCreateView.as_view(), name='patient_basic_create'),
	path('basic/<str:patient_id>/', PatientBasicRetrieveUpdateView.as_view(), name='patient_basic_retrieve'),

	# API endpoints for patient history details
	path('history/<str:patient_id>/<str:history_type>/',
	     PatientHistoryRetrieveUpdateViewSet.as_view({
		     'get': 'list',
		     'post': 'create',
	     }),
	     name='patient_history_retrieve_create'),
	path('history/<str:patient_id>/<str:history_type>/<int:pk>/',
	     PatientHistoryRetrieveUpdateViewSet.as_view({
		     # 'patch': 'partial_update',
		     'delete': 'destroy',
	     }),
	     name='patient_history_update_delete'),

]
