from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializers import *

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


