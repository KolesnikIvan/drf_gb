# from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import MyUser
from .serializers import MyUserModelSerializer

# Create your views here.
class MyUserModelViewSet(ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = MyUserModelSerializer
    