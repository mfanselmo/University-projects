from rest_framework import serializers
from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('name','phone','email_address')


class TicketSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Ticket
		fields = ('tid','created_at','status','time_of_request','time_of_entry','time_of_exit')
class PositionSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Position
		fields = ('latitude','longitude')
class StoreSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Store
		fields = ('storeid','location','max_customers','current_customers','manager','name')
