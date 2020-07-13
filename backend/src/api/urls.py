from django.urls import path

from api.views.doctors import DoctorView

urlpatterns = [
	path('doctor/', DoctorView.as_view()),
]
