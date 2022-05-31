from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from .views import ProjectViewSetLes1, TodoViewSetLes1
from .models import Project, Todo
from L1_work_with_user_app.models import MyUser
import mixer

# Create your tests here.

class TestProjectViewSet(TestCase):

    def test_apiclient(self):
        print('test with API client')
        users=[]
        for i in range(3):
            user = MyUser.objects.create(username='user'+str(i), email='user'+str(i))
            user.save()
            users.append(user)
        project = Project.objects.create(name='TestProject', 
                        link_to_repo='http://TestProject.com')
        # https://stackoverflow.com/questions/50015204/direct-assignment-to-the-forward-side-of-a-many-to-many-set-is-prohibited-use-e
        project.users.set(users)
        client = APIClient()
        response = client.get(f'/api/projects_les1/{project.uid}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print('APIClient test ended')


class TestTOdoViewset(APITestCase):
    def test_todo_using_apitestcase(self):
        print('start testinig todo view with apitestcase')
        response = self.client.get('/api/todos_les4/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print('apitestcase finished')

    def test_todo_using_mixer(self):
        print('test with mixer')
        todo = mixer.blend(Todo)
        admin = MyUser.objects.create_superuser('admin', 'adminadmin@gmail.com', 'geekbrains')
        self.client.login(username='admin', password='geekbrains')
        response = self.client.put(f'/api/todos_les4/{todo.uid}', 
                                    {'text':'hello world', 
                                    'project':todo.project.uid,
                                    })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
