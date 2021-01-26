from django.db import models

# Create your models here.

class Ticket(models.Model):
	tid = models.IntegerField(primary_key=True)
	created_at = models.DateTimeField(auto_now_add=True)
	status_choices = (('New','New'),('Booked','Booked'),('Scanned','Scanned'),('Completed','Completed'),('Deleted','Deleted'))
	status =  models.CharField(max_length=10,choices=status_choices,default='New')
	time_of_request = models.DateTimeField()
	time_of_entry = models.DateTimeField()
	time_of_exit = models.DateTimeField()

	def __str__(self):
		return self.time_of_request

class User(models.Model):
	name = models.CharField(max_length=25)
	phone=models.CharField(max_length=13)
	email_address = models.CharField(max_length=30,unique=True)

	def __str__(self):
		return self.name

class Position(models.Model):
	latitude = models.FloatField(default=0.0)
	longitude = models.FloatField(default=0.0)
	def __str__(self):
		return str(self.latitude)+"-----"+str(self.longitude)

class Store(models.Model):
	storeid= models.IntegerField(primary_key=True)
	location = models.ForeignKey(Position,on_delete=models.DO_NOTHING)
	max_customers = models.IntegerField()
	current_customers = models.IntegerField()
	manager = models.OneToOneField(User,to_field='email_address',on_delete=models.DO_NOTHING)
	name = models.CharField(max_length=25)
	
	def __str__(self):
		return self.name



