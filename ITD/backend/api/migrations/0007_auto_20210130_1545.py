# Generated by Django 3.1.5 on 2021-01-30 14:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210130_1433'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookingslot',
            old_name='store_store',
            new_name='slot_store',
        ),
    ]
