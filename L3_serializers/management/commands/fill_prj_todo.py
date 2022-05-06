from django.core.management.base import BaseCommand
from L3_serializers.models import Project, Todo
from faker import Faker
from L1_work_with_user_app.models import MyUser
import random


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        if Project.objects.all().count != 0\
        or Todo.objects.all().count != 0:
            # if the table isn't empty, clear it
            Project.objects.all().delete()
            Todo.objects.all().delete()
        
        # https://stackoverflow.com/questions/22816704/django-get-a-random-object
        pks = list(MyUser.objects.values_list('uid', flat=True))
        for _ in range(random.randint(3, 5)):
            rnd_pks = list(random.sample(pks, k=random.randint(1, len(pks))))
            rnd_users = MyUser.objects.filter(uid__in=rnd_pks)
            prj = Project(
                name=Faker('en_US').sentence(nb_words=3),
                link_to_repo=Faker().uri(),
            )
            # prj.objects.create()
            prj.save()  # https://stackoverflow/questions/7837033/vlueerror-cannot-add-instance-is-on-database-default-value-is-on-databas
            prj.users.set(rnd_users)  # здесь ошибка; prj.users.add вызывает ту же ошибку
            prj.save()

        for _ in range(random.randint(3, 5)):
            td = Todo(
                project=random.choice(Project.objects.all()),
                text=Faker().text(),
                author=random.choice(MyUser.objects.all()),
            )
            td.save()
