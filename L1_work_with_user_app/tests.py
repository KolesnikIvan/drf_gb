from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from .models import MyUser
from .views import MyUserViewSet
import random
from faker import Faker
from mimesis import Person

# Create your tests here.

class TestMyUser(TestCase):
    
    def test_get_user_list(self):
        print('test get user list')
        factory = APIRequestFactory()
        request = factory.get('/api/users_les1/')
        view = MyUserViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(self.assertEqual(response.status_code, status.HTTP_200_OK))

    def test_post_user(self):
        print('post test is on')
        pers = Person
        factory = APIRequestFactory()
        # request = factory.post('/api/users/', 
        #     {'username':Faker().name, 
        #     'firstname':Faker().first_name, 
        #     'lastname': Faker().last_name,
        #     'email': Faker().email,
        #     # 'position': Person().worldview(),
        #     },
        #     format='json')
        request = factory.post('/api/users/', {'username':'Pushkin', 'fristname':'Alex', 'lastname':'Pushkin', 'email':'pushkin@gmail.com'}, format='json')
        view = MyUserViewSet.as_view({'post':'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        print('authenticated post test is on')
        admin = MyUser.objects.create_superuser(
                        'superuser', 
                        'super@itcom.com', 
                        'superman',
                        )
        force_authenticate(request, admin)
        view_auth = MyUserViewSet.as_view({'post':'create'})
        response = view_auth(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
