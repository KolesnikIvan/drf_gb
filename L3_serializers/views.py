from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, TodoSerializer
from .models import Project, Todo
from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination
# from rest_framework.generics import GenericAPIView

# Create your views here.

class ProjectViewSetLes1(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectPaginationClass(LimitOffsetPagination):
    default_limit = 2  # по заданию надо 10, но нет столько

class TodoPagination(LimitOffsetPagination):
    default_limit = 2 # по заданию должно быть 20

class ProjectViewSetLes4(mixins.CreateModelMixin, 
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin, 
                    mixins.DestroyModelMixin, 
                    viewsets.GenericViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    pagination_class = ProjectPaginationClass

    def get_queryset(self):
        print('req_headers', self.request.headers)
        print('req_Data', self.request.data)
        param = self.request.query_params.get('name')
        if param:
            return Project.objects.filter(name__contains=param[0])
        else:
            return super().get_queryset()

class TodoViewSetLes1(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoViewSetLes4(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    pagination_class = TodoPagination
    
    def destroy(self, pk):
        # при удалении меняю одно bool поле
        obj_to_del = Todo.objects.get(pk=pk)
        obj_to_del.is_closed = True
