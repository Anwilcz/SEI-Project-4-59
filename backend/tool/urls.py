from typing import ItemsView
from django.db import router
from django.urls import path
from rest_framework import routers
from .views import *

urlpatterns = [
  path('', ToolListView.as_view()),
]
