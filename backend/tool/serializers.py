from django.db import models
from rest_framework import serializers
from .models import *
from rest_framework.serializers import DictField


class WorkedWithCountrySerializer(serializers.ModelSerializer):
  class Meta:
    model = WorkedWithCountry
    fields = '__all__'


class WorkedWithCompanySizeSerializer(serializers.ModelSerializer):
  class Meta:
    model = WorkedWithCompanySize
    fields = '__all__'

class WantsToWorkWithCountrySerializer(serializers.ModelSerializer):
  class Meta:
    model = WantsToWorkWithCountry
    fields = '__all__'

class WantsToWorkWithCompanySizeSerializer(serializers.ModelSerializer):
  class Meta:
    model = WantsToWorkWithCompanySize
    fields = '__all__'



class ToolSerializer(serializers.ModelSerializer):
  worked_with_company_size = WorkedWithCompanySizeSerializer()
  wants_to_work_with_company_size = WantsToWorkWithCompanySizeSerializer()
  worked_with_country = WorkedWithCountrySerializer()
  wants_to_work_with_country = WantsToWorkWithCountrySerializer()

  class Meta:
    model = Tool
    fields = ['name', 'category', 'image', 'worked_with', 'worked_with_prof_devs', 'worked_others', 'worked_with_independent', 'worked_with_full_time', 'worked_with_part_time', 'worked_with_unemployed', 'worked_with_student', 'worked_with_prefer_not_to_say', 'worked_with_na', 'worked_with_company_size', 'worked_with_country', 'wants_to_work_with', 'wants_to_work_with_prof_devs', 'wants_to_work_with_others', 'wants_to_work_with_independent', 'wants_to_work_with_full_time', 'wants_to_work_with_part_time', 'wants_to_work_with_unemployed', 'wants_to_work_with_student', 'wants_to_work_with_prefer_not_to_say', 'wants_to_work_with_na', 'wants_to_work_with_company_size', 'wants_to_work_with_country', 'linux_prof_dev', 'mac_os_prof_dev', 'windows_prof_dev', 'linux_others', 'mac_os_others', 'windows_others']
    
  def create(self, validated_data):
 
    worked_with_company_size_data = validated_data.pop('worked_with_company_size')
    wants_to_work_with_company_size_data = validated_data.pop('wants_to_work_with_company_size')
    worked_with_country_data = validated_data.pop('worked_with_country')
    wants_to_work_with_country_data = validated_data.pop('wants_to_work_with_country')
 
    tool = Tool.objects.create(**validated_data)

    WorkedWithCompanySize.objects.create(tool=tool, **worked_with_company_size_data)
    WantsToWorkWithCompanySize.objects.create(tool=tool, **wants_to_work_with_company_size_data)
    WorkedWithCountry.objects.create(tool=tool, **worked_with_country_data)
    WantsToWorkWithCountry.objects.create(tool=tool, **wants_to_work_with_country_data)
 
    return Tool

class PopulatedToolSerializer(serializers.ModelSerializer):
  worked_with_company_size = WorkedWithCompanySizeSerializer(many=True, read_only=True)
  wants_to_work_with_company_size = WantsToWorkWithCompanySizeSerializer(many=True, read_only=True)
  worked_with_country = WorkedWithCountrySerializer(many=True, read_only=True)
  wants_to_work_with_country = WantsToWorkWithCountrySerializer(many=True, read_only=True)

  class Meta:
    model = Tool
    fields = ['name', 'category', 'image', 'worked_with', 'worked_with_prof_devs', 'worked_others', 'worked_with_independent', 'worked_with_full_time', 'worked_with_part_time', 'worked_with_unemployed', 'worked_with_student', 'worked_with_prefer_not_to_say', 'worked_with_na', 'worked_with_company_size', 'worked_with_country', 'wants_to_work_with', 'wants_to_work_with_prof_devs', 'wants_to_work_with_others', 'wants_to_work_with_independent', 'wants_to_work_with_full_time', 'wants_to_work_with_part_time', 'wants_to_work_with_unemployed', 'wants_to_work_with_student', 'wants_to_work_with_prefer_not_to_say', 'wants_to_work_with_na', 'wants_to_work_with_company_size', 'wants_to_work_with_country', 'linux_prof_dev', 'mac_os_prof_dev', 'windows_prof_dev', 'linux_others', 'mac_os_others', 'windows_others']


