from django.contrib import admin

from .models import *

admin.site.register(Consultation)

admin.site.register(ExaminationMaster)
admin.site.register(ExaminationDone)

admin.site.register(InvestigationGroups)
admin.site.register(InvestigationDone)
admin.site.register(InvestigationPrescribed)

admin.site.register(Diagnosis)

admin.site.register(GeneralAdvice)

admin.site.register(DrugMaster)
admin.site.register(DrugPrescribed)

admin.site.register(FollowUp)
admin.site.register(ReferredTo)
admin.site.register(ReferredFrom)
admin.site.register(Remark)
