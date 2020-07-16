from django.urls import path

from misc.api.views.auth import DeleteToken


urlpatterns = [
	path('auth/delete_token/', DeleteToken, name='delete_token'),
]