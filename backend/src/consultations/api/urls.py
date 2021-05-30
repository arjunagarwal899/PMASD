from django.urls import path

from consultations.api.views.examination import ExaminationMasterView


urlpatterns = [
	# API endpoints to list, create, update and delete the examinations master table
	path('examination/master/', ExaminationMasterView.as_view({'get': 'list', 'post':'create'}), name='examination_master_create_list'),
	path('examination/master/<int:pk>/', ExaminationMasterView.as_view({'patch': 'partial_update', 'delete': 'destroy'}), name='examination_master_update_delete'),
]