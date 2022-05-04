from django.db import models
from L1_work_with_user_app.models import MyUser
# https://docs.djangoproject.com/en/4.0/ref/models/fields/#model-field-types
from uuid import uuid4

# Create your models here.

class Project(models.Model):
    # ADD UID!!!!!!!!!
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=24)
    link_to_repo = models.URLField(max_length=100, blank=True,)
    users = models.ManyToManyField(MyUser)

    def __str__(self):
        print(self.uid, self.name)

class Todo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.OneToOneField(Project, on_delete=models.SET_NULL)
    text = models.TextField()
    created_on = models.DateField(auto_now_add=True)
    updated_on = models.DateField(auto_now=True)
    author = models.OneToOneField(MyUser, on_delete=models.SET_NULL)

    def __str__(self):
        print(self.uid, self.project, self.text)