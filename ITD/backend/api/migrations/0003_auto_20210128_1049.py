# Generated by Django 3.1.5 on 2021-01-28 09:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210128_1043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='managed_store_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.store'),
        ),
    ]
