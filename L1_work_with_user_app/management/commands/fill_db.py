"""
команда добавляет пользователей в базу
"""
from django.core.management.base import BaseCommand
from L1_work_with_user_app.models import MyUser
import random
from string import ascii_lowercase
from faker import Faker

FIRSTNAMES = ['Andrew', 'Boris', 'Vitaly', 'Gennadiy', 'Dmitry']
LASTNAMES = ['Kuznetsov', 'Petrov', 'Volkov', 'Zemlyanikin', 'Hasanov']
POSITIONS = ['1st_cat_specialist', '2nd_cat_specialist', '3rd_cat_specialist',\
    'manager', 'project_manager', 'tester', 'analyst', 'secretary']

# class Command(BaseCommand):
#     def handle(self, *args, **kwargs):
#         for fst, lst in zip (FIRSTNAMES, LASTNAMES):
#             letters = (random.choice((ascii_lowercase)) for _ in range(random.randint(3,10)))
#             uname = ''.join(letters)
#             user = MyUser(
#                 username=uname,
#                 firstname=fst, 
#                 lastname=lst, 
#                 email=''.join((fst, lst, '@itcompany.com')),
#                 position=random.choice(POSITIONS),
#                 )
#             user.save()

            # MyUser.objects.create_superuser('admin', 'admin@itcompany.com', 'geekshop')
   

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for _ in range(1,7):
            user_name = Faker('ru_RU').unique.user_name()
            first_name = Faker('ru_RU').first_name()
            last_name = Faker('ru-RU').last_name()
            mail = Faker().unique.email()
            position = random.choice(POSITIONS)
            user = MyUser(username=user_name,
                firstname=first_name,
                lastname=last_name,
                email=mail,
                position=position)
            user.save()
