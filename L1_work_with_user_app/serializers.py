from rest_framework.serializers import HyperlinkedModelSerializer
from .models import MyUser


class MyUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        # перечень полей по п.7 задания
        fields = ['username', 'firstname', 'lastname', 'email']
