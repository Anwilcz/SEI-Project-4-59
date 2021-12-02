from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.exceptions import PermissionDenied
from rest_framework.utils import serializer_helpers
from rest_framework.views import APIView, status # check if works without (...).views

from django.contrib.auth import get_user_model

from .serializers import UserSerializer
User = get_user_model()


from .models import *
from .serializers import *

# Create your views here.

class UserProfilesView(APIView):
  def get(self, request):
    all_users = User.objects.all()
    serialized_users = UserSerializer(all_users, many=True)
    return Response(serialized_users.data)

class UserProfileView(APIView):
  def get(self, request, username):
    user = User.objects.get(username=username)
    serialized_user = UserSerializer(user)
    print(serialized_user)
    return Response(serialized_user.data)

  # def put(self, request, username): ADD UPDATE
  #   user = User.objects.get(username=username)
  #   serialized_user = UserSerializer(user)
  #   print(serialized_user)
  #   return Response(serialized_user.data)
