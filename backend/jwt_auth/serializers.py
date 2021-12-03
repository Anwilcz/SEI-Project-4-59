from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from user.serializers import ProfileSerializer
from user.models import Profile
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation',)

#         class ToolSerializer(serializers.ModelSerializer):
#   worked_with_company_size = WorkedWithCompanySizeSerializer()
#   wants_to_work_with_company_size = WantsToWorkWithCompanySizeSerializer()
#   worked_with_country = WorkedWithCountrySerializer()
#   wants_to_work_with_country = WantsToWorkWithCountrySerializer()

#   class Meta:
#     model = Tool
#     fields = ['name', 'category', 'image', 'worked_with', 'worked_with_prof_devs', 'worked_others', 'worked_with_independent', 'worked_with_full_time', 'worked_with_part_time', 'worked_with_unemployed', 'worked_with_student', 'worked_with_prefer_not_to_say', 'worked_with_na', 'worked_with_company_size', 'worked_with_country', 'wants_to_work_with', 'wants_to_work_with_prof_devs', 'wants_to_work_with_others', 'wants_to_work_with_independent', 'wants_to_work_with_full_time', 'wants_to_work_with_part_time', 'wants_to_work_with_unemployed', 'wants_to_work_with_student', 'wants_to_work_with_prefer_not_to_say', 'wants_to_work_with_na', 'wants_to_work_with_company_size', 'wants_to_work_with_country', 'linux_prof_dev', 'mac_os_prof_dev', 'windows_prof_dev', 'linux_others', 'mac_os_others', 'windows_others']
    
#   def create(self, validated_data):
 
#     worked_with_company_size_data = validated_data.pop('worked_with_company_size')
#     wants_to_work_with_company_size_data = validated_data.pop('wants_to_work_with_company_size')
#     worked_with_country_data = validated_data.pop('worked_with_country')
#     wants_to_work_with_country_data = validated_data.pop('wants_to_work_with_country')
 
#     tool = Tool.objects.create(**validated_data)

#     WorkedWithCompanySize.objects.create(tool=tool, **worked_with_company_size_data)
#     WantsToWorkWithCompanySize.objects.create(tool=tool, **wants_to_work_with_company_size_data)
#     WorkedWithCountry.objects.create(tool=tool, **worked_with_country_data)
#     WantsToWorkWithCountry.objects.create(tool=tool, **wants_to_work_with_country_data)
 
#     return Tool

# class PopulatedToolSerializer(serializers.ModelSerializer):
#   worked_with_company_size = WorkedWithCompanySizeSerializer(read_only=True)
#   wants_to_work_with_company_size = WantsToWorkWithCompanySizeSerializer(read_only=True)
#   worked_with_country = WorkedWithCountrySerializer(read_only=True)
#   wants_to_work_with_country = WantsToWorkWithCountrySerializer(read_only=True)

#   class Meta:
#     model = Tool
#     fields = ['name', 'category', 'image', 'worked_with', 'worked_with_prof_devs', 'worked_others', 'worked_with_independent', 'worked_with_full_time', 'worked_with_part_time', 'worked_with_unemployed', 'worked_with_student', 'worked_with_prefer_not_to_say', 'worked_with_na', 'worked_with_company_size', 'worked_with_country', 'wants_to_work_with', 'wants_to_work_with_prof_devs', 'wants_to_work_with_others', 'wants_to_work_with_independent', 'wants_to_work_with_full_time', 'wants_to_work_with_part_time', 'wants_to_work_with_unemployed', 'wants_to_work_with_student', 'wants_to_work_with_prefer_not_to_say', 'wants_to_work_with_na', 'wants_to_work_with_company_size', 'wants_to_work_with_country', 'linux_prof_dev', 'mac_os_prof_dev', 'windows_prof_dev', 'linux_others', 'mac_os_others', 'windows_others']
