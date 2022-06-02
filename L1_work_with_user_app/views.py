# from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, mixins
from rest_framework.renderers import JSONRenderer
from .models import MyUser
from .serializers import MyUserModelSerializer, MyUserSerializerLes9IsSuperUser
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import (
    UpdateAPIView,
    ListAPIView,
    GenericAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

# Create your views here.
class MyUserViewSet(ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = MyUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            # 9th lesson task, add other serializer in the other version
            return MyUserSerializerLes9IsSuperUser
        else:
            return MyUserModelSerializer
    

class MyUserViewSet2(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    
    # хотелось сделать просмотр и изменения 
    # в одном и том же классе, 
    queryset = MyUser.objects.all()
    serializer_class = MyUserModelSerializer

# ниже пробные варианты
class MyUserViewSet3(viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        # метод для получения списка пользователей
        users = MyUser.objects.all()
        serializer = MyUserModelSerializer(users, many=True)
        return Response(serializer.data)

    def retireve(self, request, pk=None):
        # метод для получения отдельного пользователя
        user = get_object_or_404(MyUser, pk=pk)
        serializer = MyUserModelSerializer(user)
        return Response(serializer.data)


class MyUserListAndUpdateView2(ListAPIView, RetrieveAPIView, UpdateAPIView):
    renderer_class = [JSONRenderer]
    queryset = MyUser.objects.all()
    serializer_class = MyUserModelSerializer
    

class MyUserListAndUpdateView(mixins.ListModelMixin, 
                                mixins.UpdateModelMixin, 
                                GenericAPIView):
    renderer_class = [JSONRenderer]
    queryset = MyUser.objects.all()
    serializer_class = MyUserModelSerializer
