from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView, status # check if works without (...).views

from .models import *
from .serializers import *

# Create your views here.

class ToolListView(APIView):
  def post(self, request):
    item = ToolSerializer(data = request.data)
    if item.is_valid():
      item.save()
      return Response({'message': 'Tool has been added successfully'}, status=status.HTTP_201_CREATED)
    else:
      return Response(item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, request):
    tools = Tool.objects.all()
    serialized_tools = ToolListSerializer(tools, many = True)
    return Response(serialized_tools.data, status=status.HTTP_200_OK)


