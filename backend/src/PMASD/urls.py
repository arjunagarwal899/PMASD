from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path('admin/', admin.site.urls),
	path('auth/', include('dj_rest_auth.urls')),


	# ***** Custom API endpoints *****

	# Exception: End point provided to 'misc' app may have only 'http(s)://domain_name:port/api/' only
	path('', include('misc.api.urls')),

	# End point for all "patient" transactions
	path('api/patient/', include('patients.api.urls')),

# 	End point for all "consultation" requirements
	path('api/consultation/', include('consultations.api.urls')),
]
