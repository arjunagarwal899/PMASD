from django.contrib import admin

from .models import Profile, Hospital, ProfessionalService

admin.site.register(Profile)
admin.site.register(Hospital)
admin.site.register(ProfessionalService)
