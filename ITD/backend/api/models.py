from django.db import models

# Create your models here.


class Position(models.Model):
	address = models.CharField(max_length=100,null=True)
	latitude = models.FloatField(default=0.0)
	longitude = models.FloatField(default=0.0)
	def __str__(self):
		return str(self.latitude)+"-----"+str(self.longitude)



class Store(models.Model):
	storeid= models.IntegerField(primary_key=True)
	location = models.OneToOneField(Position,on_delete=models.DO_NOTHING)
	max_customers = models.IntegerField()
	current_customers = models.IntegerField()
	name = models.CharField(max_length=25)
	
	def __str__(self):
		return self.name


class User(models.Model):
	userid= models.IntegerField(primary_key=True)
	name = models.CharField(max_length=25,null=True)
	phone=models.CharField(max_length=13)
	email_address = models.CharField(max_length=30,null=True)
	isManager = models.BooleanField()
	managed_store_id = models.ForeignKey(Store,to_field='storeid',on_delete=models.DO_NOTHING,null=True)


	def __str__(self):
		return self.name






class Ticket(models.Model):
	tid = models.IntegerField(primary_key=True)
	created_at = models.DateTimeField(auto_now_add=True)
	status_choices = (('New','New'),('Booked','Booked'),('Scanned','Scanned'),('Completed','Completed'),('Deleted','Deleted'))
	status =  models.CharField(max_length=10,choices=status_choices,default='New')
	time_of_request = models.DateTimeField(unique=True)
	time_of_entry = models.DateTimeField()
	time_of_exit = models.DateTimeField()
	assigned_to_user= models.ForeignKey(to=User,to_field="userid",on_delete=models.CASCADE)
	assigned_to_store = models.ForeignKey(Store,to_field="storeid",on_delete=models.CASCADE)


	def __str__(self):
		return str(self.assigned_to_user.name)+""+str(self.time_of_request)


