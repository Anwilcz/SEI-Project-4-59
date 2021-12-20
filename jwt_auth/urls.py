from django.urls import path
from . import views
from .views import RegisterView, LoginView, logout_view


urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('logout/', views.logout_view, name='logout_view')
]