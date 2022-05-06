# Generated by Django 4.0.4 on 2022-05-04 18:47

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('L1_work_with_user_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=24)),
                ('link_to_repo', models.URLField(blank=True, max_length=100)),
                ('users', models.ManyToManyField(to='L1_work_with_user_app.myuser')),
            ],
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('created_on', models.DateField(auto_now_add=True)),
                ('updated_on', models.DateField(auto_now=True)),
                ('author', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='L1_work_with_user_app.myuser')),
                ('project', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='L3_serializers.project')),
            ],
        ),
    ]
