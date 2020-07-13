from django.contrib import admin

from .models import Doctor, DoctorEmail, DoctorMobile

admin.site.register(Doctor)
admin.site.register(DoctorMobile)
admin.site.register(DoctorEmail)
