from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('rest_auth.urls')),       # url is auth/ and not rest-auth/

    path('api/', include('api.urls')),
]
