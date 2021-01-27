from rest_framework import serializers
from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('userid','name','phone','email_address','isManager','managed_store_id')


class TicketSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Ticket
		fields = ('tid','created_at','status','time_of_request','time_of_entry','time_of_exit','assigned_to_user','assigned_to_store')
class PositionSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Position
		fields = ('address','latitude','longitude')
class StoreSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Store
		fields = ('storeid','location','max_customers','current_customers','name')

