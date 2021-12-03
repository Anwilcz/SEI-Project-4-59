from django.db import models
from django.contrib.auth.models import User
from tool.models import Tool

# Create your models here.

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
  slogan = models.CharField(max_length=100, blank=True)
  location = models.CharField(max_length=100, blank=True)
  image = models.ImageField(default='default.jpg', upload_to='profile_images')
  favourited = models.ManyToManyField(Tool, blank=True)

  def __str__(self):
    return f'{self.user.username} Profile'