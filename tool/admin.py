from django.contrib import admin
from .models import *
# from import_export.admin import ImportExportModelAdmin


# Register your models here.
# class ToolAdmin(ImportExportModelAdmin):
#   pass

admin.site.register(Tool)

# class WantsToWorkWithCompanySizeAdmin(ImportExportModelAdmin):
#   pass

admin.site.register(WantsToWorkWithCompanySize)

# class WorkedWithCompanySizeAdmin(ImportExportModelAdmin):
#   pass

admin.site.register(WorkedWithCompanySize)

# class WantsToWorkWithCountryAdmin(ImportExportModelAdmin):
#   pass

admin.site.register(WantsToWorkWithCountry)

# class WorkedWithCountryAdmin(ImportExportModelAdmin):
#   pass

admin.site.register(WorkedWithCountry)
