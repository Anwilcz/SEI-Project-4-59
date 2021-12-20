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
    fields = ('user', 'slogan', 'location', 'image', 'favourited',)
  
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    profile = ProfileSerializer(read_only=True)

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
        fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'profile',)

    def create(self, validated_data):
      user = User.objects.create(**validated_data)
      Profile.objects.create(user=user)
      user.save()
      return user