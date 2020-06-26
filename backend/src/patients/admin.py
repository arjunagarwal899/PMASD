from django.contrib import admin

from .models import *

admin.site.register(Patient)
admin.site.register(PatientMobile)
admin.site.register(PatientEmail)

admin.site.register(PatientPresentHistory)
admin.site.register(PatientPastHistory)
admin.site.register(PatientPersonalHistory)
admin.site.register(PatientFamilyHistory)
admin.site.register(PatientOBGYNHistory)
