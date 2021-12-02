from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from .models import *
User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    exclude = ('id', 'user')
  

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ('username', 'profile',)