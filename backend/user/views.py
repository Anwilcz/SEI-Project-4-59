
from rest_framework.response import Response
from rest_framework.views import APIView, status # check if works without (...).views
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
    return Response(serialized_users.data, status=status.HTTP_200_OK)


class UserProfileView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)


  def get(self, request, username):
    try:
      user = User.objects.get(username=username)
      serialized_user = UserSerializer(user)
      return Response(serialized_user.data, status=status.HTTP_200_OK)
    except:
      return Response({"message": "User profile not found"}, status.HTTP_404_NOT_FOUND)

  def post(self, request, username):
    try:
      user = User.objects.get(username=username)
      if user == request.user:
        profile_data = request.data
        profile_data['user'] = request.user.id
        profile = ProfileSerializer(data=profile_data)
        if profile.is_valid():
          profile.save()
          return Response(profile.data, status=status.HTTP_200_OK)
        else:
          return Response(profile.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      else:
        return Response({"message": "Authentication credentials were not provided."}, status.HTTP_401_UNAUTHORIZED)
    except:
      return Response({"message": "User profile not found"}, status.HTTP_404_NOT_FOUND)


  def delete(self, request, username):
    try:
      user = User.objects.get(username=username)
    except:
      return Response({"message": "User profile not found"}, status.HTTP_404_NOT_FOUND)
    if user == request.user:
      try:
        user.delete()
        return Response({"message": "User profile has been deleted"}, status.HTTP_204_NO_CONTENT)
      except: 
        Response({"message": "User profile not found"}, status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message": "Authentication credentials were not provided."}, status.HTTP_401_UNAUTHORIZED)


  def put(self, request, username):
    try:
      user = User.objects.get(username=username)
    except:
      return Response({"message": "User profile not found"}, status.HTTP_404_NOT_FOUND)
    if user == request.user:
      profile = Profile.objects.get(user=request.user)
      profile_data = request.data
      profile_data['user'] = request.user.id
      updated_profile = ProfileSerializer(profile, data=request.data)
      print(updated_profile)
      if updated_profile.is_valid():
        updated_profile.save()
        return Response(updated_profile.data, status=status.HTTP_200_OK)
      else:
        return Response(updated_profile.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
        return Response({"message": "Authentication credentials were not provided."}, status.HTTP_401_UNAUTHORIZED)


