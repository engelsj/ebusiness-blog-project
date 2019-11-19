from django.db import models

# Create your models here.

class Users(models.Model):
    UserName = models.CharField(max_length=60)
    Password = models.CharField(max_length=60)
    PhoneNumber = models.CharField(max_length=20)
