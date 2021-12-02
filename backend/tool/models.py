from typing import Dict
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import *


class Tool(models.Model):
  name = models.CharField(max_length= 50, default='name')
  category = models.CharField(max_length= 50, default='category')
  image = models.CharField(max_length= 200, default='image')
  worked_with = models.IntegerField(default=0)
  worked_with_prof_devs = models.IntegerField(default=0)
  worked_others = models.IntegerField(default=0)
  worked_with_independent = models.IntegerField(default=0)
  worked_with_full_time = models.IntegerField(default=0)
  worked_with_part_time = models.IntegerField(default=0)
  worked_with_unemployed = models.IntegerField(default=0)
  worked_with_student = models.IntegerField(default=0)
  worked_with_prefer_not_to_say = models.IntegerField(default=0)
  worked_with_na = models.IntegerField(default=0)
  wants_to_work_with = models.IntegerField(default=0)
  wants_to_work_with_prof_devs = models.IntegerField(default=0)
  wants_to_work_with_others = models.IntegerField(default=0)
  wants_to_work_with_independent = models.IntegerField(default=0)
  wants_to_work_with_full_time = models.IntegerField(default=0)
  wants_to_work_with_part_time = models.IntegerField(default=0)
  wants_to_work_with_unemployed = models.IntegerField(default=0)
  wants_to_work_with_student = models.IntegerField(default=0)
  wants_to_work_with_prefer_not_to_say = models.IntegerField(default=0)
  wants_to_work_with_na = models.IntegerField(default=0)
  linux_prof_dev = models.IntegerField(default=0)
  mac_os_prof_dev = models.IntegerField(default=0)
  windows_prof_dev = models.IntegerField(default=0)
  linux_others = models.IntegerField(default=0)
  mac_os_others = models.IntegerField(default=0)
  windows_others = models.IntegerField(default=0)


  def __str__(self):
    return f'{self.id} | Name: {self.name} | Category: {self.category}'

class WorkedWithCompanySize(models.Model):
  tool = models.ForeignKey(Tool, related_name='worked_with_company_size', on_delete=CASCADE, default=1)
  _just_me = models.IntegerField(default=0)
  _2_to_9_employees = models.IntegerField(default=0)
  _10_to_19_employees = models.IntegerField(default=0)
  _20_to_99_employees = models.IntegerField(default=0)
  _100_to_499_employees = models.IntegerField(default=0)
  _500_to_999_employees = models.IntegerField(default=0)
  _1000_to_4999_employees = models.IntegerField(default=0)
  _5000_to_9999_employees = models.IntegerField(default=0)
  _10000_or_more_employees = models.IntegerField(default=0)

class WorkedWithCountry(models.Model):
  tool = models.ForeignKey(Tool, related_name='worked_with_country', on_delete=CASCADE, default=1)
  united_states_of_america = models.IntegerField(default=0)
  united_kingdom = models.IntegerField(default=0)
  india = models.IntegerField(default=0)
  germany = models.IntegerField(default=0)
  france = models.IntegerField(default=0)
  canada = models.IntegerField(default=0)
  brazil = models.IntegerField(default=0)
  poland = models.IntegerField(default=0)
  netherlands = models.IntegerField(default=0)
  italy = models.IntegerField(default=0)
  
class WantsToWorkWithCompanySize(models.Model):
  tool = models.ForeignKey(Tool, related_name='wants_to_work_with_company_size', on_delete=CASCADE, default=1)
  _just_me = models.IntegerField(default=0)
  _2_to_9_employees = models.IntegerField(default=0)
  _10_to_19_employees = models.IntegerField(default=0)
  _20_to_99_employees = models.IntegerField(default=0)
  _100_to_499_employees = models.IntegerField(default=0)
  _500_to_999_employees = models.IntegerField(default=0)
  _1000_to_4999_employees = models.IntegerField(default=0)
  _5000_to_9999_employees = models.IntegerField(default=0)
  _10000_or_more_employees = models.IntegerField(default=0)

class WantsToWorkWithCountry(models.Model):
  tool = models.ForeignKey(Tool, related_name='wants_to_work_with_country', on_delete=CASCADE, default=1)
  united_states_of_america = models.IntegerField(default=0)
  united_kingdom = models.IntegerField(default=0)
  india = models.IntegerField(default=0)
  germany = models.IntegerField(default=0)
  france = models.IntegerField(default=0)
  canada = models.IntegerField(default=0)
  brazil = models.IntegerField(default=0)
  poland = models.IntegerField(default=0)
  netherlands = models.IntegerField(default=0)
  italy = models.IntegerField(default=0)

  
