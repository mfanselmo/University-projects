# Generated by Django 3.1.5 on 2021-02-03 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_merge_20210130_1446'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Error',
        ),
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('New', 'New'), ('Scanned', 'Scanned'), ('Completed', 'Completed')], default='New', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='managed_store_id',
            field=models.ManyToManyField(default=[], to='api.Store'),
        ),
    ]
