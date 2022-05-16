from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

# Create your models here.
# class MyUser(models.Model):
class MyUser(AbstractUser):
    # ADD position choices
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(max_length=64, unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    # параметер unique=True делает атрибут email уникальным
    email = models.CharField(max_length=64, unique=True)
    position = models.CharField(max_length=32, default='specialist')
    