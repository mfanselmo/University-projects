# Generated by Django 3.1.5 on 2021-01-29 14:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=100, null=True)),
                ('latitude', models.FloatField(default=0.0)),
                ('longitude', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('store_id', models.IntegerField(primary_key=True, serialize=False)),
                ('max_customers', models.IntegerField()),
                ('current_customers', models.IntegerField()),
                ('name', models.CharField(max_length=25)),
                ('location', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.position')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25, null=True)),
                ('phone_number', models.CharField(max_length=13)),
                ('email_address', models.CharField(max_length=30, null=True)),
                ('isManager', models.BooleanField()),
                ('managed_store_id', models.ManyToManyField(to='api.Store')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('ticket_id', models.IntegerField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('New', 'New'), ('Booked', 'Booked'), ('Scanned', 'Scanned'), ('Completed', 'Completed'), ('Deleted', 'Deleted')], default='New', max_length=10)),
                ('time_of_request', models.DateTimeField(unique=True)),
                ('time_of_entry', models.DateTimeField()),
                ('time_of_exit', models.DateTimeField()),
                ('categories_to_visit', models.CharField(blank=True, default='groceries', max_length=150, null=True)),
                ('assigned_to_store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.store')),
                ('assigned_to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
