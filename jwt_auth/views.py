from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model, logout
from django.conf import settings
from django.http.response import HttpResponse
import jwt
from user.serializers import UserSerializer

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})
            
        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        user = self.get_user(username)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        print(token)
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

def logout_view(request):
  print('Before logout - Should be an object ->', request.user)
  logout(request)
  print('After logout - Should be null ->', request.user)
  return HttpResponse('User logged out successfuly')