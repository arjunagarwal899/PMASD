from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),


    # Custom API endpoints
    path('api/patient/', include('patients.api.urls')),
]
