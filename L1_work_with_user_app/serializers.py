from rest_framework.serializers import HyperlinkedModelSerializer
from .models import MyUser


class MyUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        # перечень полей по п.7 задания
        fields = ['username', 'firstname', 'lastname', 'email']

class MyUserSerializerLes9IsSuperUser(HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        # перечень полей по п.7 задания
        fields = ['username', 'is_superuser', 'is_staff']