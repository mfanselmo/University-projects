from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
from rest_framework import viewsets
from django.contrib.auth.models import User as DBUser
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
class UserViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset= User.objects.all().order_by('name')
	def get_serializer_class(self):
		if self.request.method== 'GET':
			return UserReadSerializer
		else:
			return UserWriteSerializer

class TicketViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset= Ticket.objects.all().order_by('time_of_request')
	def get_serializer_class(self):
		if self.request.method== 'GET':
			return TicketReadSerializer
		else:
			return TicketWriteSerializer
	
class StoreViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset= Store.objects.all().order_by('name')
	def get_serializer_class(self):
		if self.request.method== 'GET':
			return StoreReadSerializer
		else:
			return StoreWriteSerializer
class PositionViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset= Position.objects.all().order_by('latitude')
	serializer_class = PositionSerializer



# def get_people_in_line(store_id):
# 	tickets =  list(Ticket.objects.filter(assigned_to_store=store_id).filter(time_of_request__date=date.today()).filter(status='New').values())
# 	return len(tickets)





# def getManagerStore(request):
# 	manager_id=request.GET.get('id')
# 	manager_data= User.objects.filter(user_id=manager_id)
# 	print(manager_data)
# 	response={}
# 	if len(manager_data) != 0:
# 		manager_data = manager_data[0]

# 		if manager_data.managed_store_id != None:
# 			store_data= manager_data.managed_store_id
# 			address = store_data.location
# 			response['data'] = [{
# 										'store_id':store_data.store_id,
# 										'lat':address.latitude,
# 										'lon': address.longitude,
# 										'address':address.address,
# 										'people_in_store':store_data.current_customers,
# 										'people_in_line': get_people_in_line(store_data.store_id),

# 									 }]
# 	else:
# 		message= 'Manager not found'
# 		response['message']= message
# 	return HttpResponse(json.dumps(response),content_type="application/json")


@csrf_exempt
def create_user(request):
	try:
		if request.method == 'POST':
			data = json.loads(request.body)
			phone_number = data.get('phone_number')
			password = data.get('password')
			user = DBUser.objects.create_user(username=phone_number,
	                                      password=password)
			token = Token.objects.create(user=phone_number)
			return HttpResponse(json.dumps({"username":user.username,"password":user.password,"token":token.key}),content_type="application/json")
	except Exception as e:
		return HttpResponse(json.dumps({"message":str(e)}))

@csrf_exempt
def get_token(request):
	if request.method=='POST':
		data = json.loads(request.body)
		phone_number = data.get('phone_number')
		password = data.get('password')
		user = authenticate(username=phone_number, password=password)
		print(user)
		if user is not None:
			token = list(Token.objects.filter(user=user).values())
			if len(token) != 0:
				token = token[0]
				return HttpResponse(json.dumps({"token":token['key']}),content_type="application/json")

			else:
				token = Token.objects.create(user=user)
				return HttpResponse(json.dumps({"token":token.key}),content_type="application/json")			
		else:
			return HttpResponse(json.dumps({"message":"not authenticated"}),content_type="application/json")
