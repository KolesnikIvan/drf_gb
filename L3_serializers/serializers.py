from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    ModelSerializer,
    )
from .models import Project, Todo
from L1_work_with_user_app.serializers import MyUserModelSerializer


class ProjectSerializer(ModelSerializer):
    users = MyUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'
        # extra_kwargs = {'url': {'view_name': 'project-detail', 'lookup_field': 'pk'}}


class TodoSerializer(HyperlinkedModelSerializer):
    author = MyUserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
        