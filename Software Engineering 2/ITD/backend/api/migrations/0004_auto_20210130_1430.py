# Generated by Django 3.1.5 on 2021-01-30 13:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_error'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='time_of_entry',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='time_of_exit',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='time_of_request',
            field=models.DateTimeField(),
        ),
        migrations.CreateModel(
            name='BookingSlots',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slot_number', models.IntegerField()),
                ('slot_date', models.DateField()),
                ('customers_in_slot', models.IntegerField()),
                ('store_store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.store')),
            ],
        ),
    ]