from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin


# Register your models here.
class ToolAdmin(ImportExportModelAdmin):
  pass

admin.site.register(Tool, ToolAdmin)

class WantsToWorkWithCompanySizeAdmin(ImportExportModelAdmin):
  pass

admin.site.register(WantsToWorkWithCompanySize, WantsToWorkWithCompanySizeAdmin)

class WorkedWithCompanySizeAdmin(ImportExportModelAdmin):
  pass

admin.site.register(WorkedWithCompanySize, WorkedWithCompanySizeAdmin)

class WantsToWorkWithCountryAdmin(ImportExportModelAdmin):
  pass

admin.site.register(WantsToWorkWithCountry, WantsToWorkWithCountryAdmin)

class WorkedWithCountryAdmin(ImportExportModelAdmin):
  pass

admin.site.register(WorkedWithCountry, WorkedWithCountryAdmin)
