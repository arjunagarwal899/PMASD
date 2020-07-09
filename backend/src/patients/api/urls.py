from django.urls import path
from patients.api.views import PatientSearchView, PatientBasicDetailView, PatientHistoryDetailView

urlpatterns = [
	path('search/', PatientSearchView.as_view(), name='patient_search'),

	path('basic/<int:pk>/', PatientBasicDetailView.as_view(), name='patient_basic_detail'),
	path('history/<int:pk>/', PatientHistoryDetailView.as_view(), name='patient_history_detail'),

]
