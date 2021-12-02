from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.serializers import Serializer
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
    serialized_tools = PopulatedToolSerializer(tools, many = True)
    return Response(serialized_tools.data, status=status.HTTP_200_OK)


class ToolDetailView(APIView):
  def get(self, request, pk):
    tool = Tool.objects.get(id=pk)
    serialized_tool = PopulatedToolSerializer(tool)
    return Response(serialized_tool.data, status=status.HTTP_200_OK)