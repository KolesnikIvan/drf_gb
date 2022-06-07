import graphene
from graphene_django import DjangoObjectType
from L1_work_with_user_app.models import MyUser
from L3_serializers.models import Project, Todo

# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value='Hi')

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class MyUserType(DjangoObjectType):
    class Meta:
        model = MyUser
        fields = ['username', 'firstname']

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    
    def resolve_all_todos(root, info):
        return Todo.objects.all()

schema = graphene.Schema(query=Query)