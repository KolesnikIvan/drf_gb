"""todonotes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from L1_work_with_user_app.views import (
    MyUserViewSet, 
    MyUserViewSet2,
    MyUserListAndUpdateView,
    MyUserListAndUpdateView2,
)
from rest_framework.authtoken import views

from L3_serializers.views import (
    ProjectViewSetLes1,
    ProjectViewSetLes4,
    TodoViewSetLes1,
    TodoViewSetLes4,
)

router = DefaultRouter()
router.register('users', MyUserViewSet, basename='myuser_les1')
router.register('users_les4', MyUserViewSet2, basename='myuser')
router.register('projects_les1', ProjectViewSetLes1, basename='project_les1')
router.register('projects_les4', ProjectViewSetLes4, basename='project_les4')
router.register('todos_les1', TodoViewSetLes1, basename='todo_les1')
router.register('todos_les4', TodoViewSetLes4, basename='todo_les4')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/userss/<int:pk>', MyUserListAndUpdateView.as_view()), 
    path('api/userss/', MyUserListAndUpdateView.as_view()),
    path('api/users_l_r', MyUserListAndUpdateView2.as_view()),
    path('api-token-auth/', views.obtain_auth_token)
]
