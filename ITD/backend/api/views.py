from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializers import *
from datetime import date

class UserViewSet(viewsets.ModelViewSet):
	queryset= User.objects.all().order_by('name')
	serializer_class = UserSerializer
	

class TicketViewSet(viewsets.ModelViewSet):
	queryset= Ticket.objects.all().order_by('time_of_request')
	serializer_class = TicketSerializer
	
class StoreViewSet(viewsets.ModelViewSet):
	queryset= Store.objects.all().order_by('name')
	serializer_class = StoreSerializer
	
class PositionViewSet(viewsets.ModelViewSet):
	queryset= Position.objects.all().order_by('latitude')
	serializer_class = PositionSerializer



def get_people_in_line(store_id):
	tickets =  list(Ticket.objects.filter(assigned_to_store=store_id).filter(time_of_request__date=date.today()).filter(status='New').values())
	return len(tickets)





def getManagerStore(request):
	manager_id=request.GET.get('id')
	manager_data= User.objects.filter(user_id=manager_id)
	print(manager_data)
	response={}
	if len(manager_data) != 0:
		manager_data = manager_data[0]

		if manager_data.managed_store_id != None:
			store_data= manager_data.managed_store_id
			address = store_data.location
			response['data'] = [{
										'store_id':store_data.store_id,
										'lat':address.latitude,
										'lon': address.longitude,
										'address':address.address,
										'people_in_store':store_data.current_customers,
										'people_in_line': get_people_in_line(store_data.store_id),

									 }]
	else:
		message= 'Manager not found'
		response['message']= message
	return HttpResponse(json.dumps(response),content_type="application/json")



