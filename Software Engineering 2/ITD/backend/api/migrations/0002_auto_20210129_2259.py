# Generated by Django 3.1.5 on 2021-01-29 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='isManager',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='managed_store_id',
            field=models.ManyToManyField(default=[], to='api.Store'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=13, unique=True),
        ),
    ]
