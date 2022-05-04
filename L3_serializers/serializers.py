from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo
from L1_work_with_user_app.serializers import MyUserModelSerializer
from .serializers import ProjectSerializer, TodoSerializer


class ProjectSerializer(HyperlinkedModelSerializer):
    users = MyUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(HyperlinkedModelSerializer):
    author = MyUserModelSerializer

    class Meta:
        model = Todo
        fields = '__all__'
        