from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from django.contrib.auth.models import User as DBUser
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import date, datetime
from django.views import View
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.core import serializers

from rest_framework import permissions
slots = {
    '9':
    {'0': {'slot_number': 0},
     '10': {'slot_number': 1},
     '20': {'slot_number': 2},
     '30': {'slot_number': 3},
     '40': {'slot_number': 4},
     '50': {'slot_number': 5}},
    '10':
    {'0': {'slot_number': 6},
     '10': {'slot_number': 7},
     '20': {'slot_number': 8},
     '30': {'slot_number': 9},
     '40': {'slot_number': 10},
     '50': {'slot_number': 11}},
    '11':
    {'0': {'slot_number': 12},
     '10': {'slot_number': 13},
     '20': {'slot_number': 14},
     '30': {'slot_number': 15},
     '40': {'slot_number': 16},
     '50': {'slot_number': 17}},
    '12':
    {'0': {'slot_number': 18},
     '10': {'slot_number': 19},
     '20': {'slot_number': 20},
     '30': {'slot_number': 21},
     '40': {'slot_number': 22},
     '50': {'slot_number': 23}},
    '13':
    {'0': {'slot_number': 24},
     '10': {'slot_number': 25},
     '20': {'slot_number': 26},
     '30': {'slot_number': 27},
     '40': {'slot_number': 28},
     '50': {'slot_number': 29}},
    '14':
    {'0': {'slot_number': 30},
     '10': {'slot_number': 31},
     '20': {'slot_number': 32},
     '30': {'slot_number': 33},
     '40': {'slot_number': 34},
     '50': {'slot_number': 35}},
    '15':
    {'0': {'slot_number': 36},
     '10': {'slot_number': 37},
     '20': {'slot_number': 38},
     '30': {'slot_number': 39},
     '40': {'slot_number': 40},
     '50': {'slot_number': 41}},
    '16':
    {'0': {'slot_number': 42},
     '10': {'slot_number': 43},
     '20': {'slot_number': 44},
     '30': {'slot_number': 45},
     '40': {'slot_number': 46},
     '50': {'slot_number': 47}},
    '17':
    {'0': {'slot_number': 48},
     '10': {'slot_number': 49},
     '20': {'slot_number': 50},
     '30': {'slot_number': 51},
     '40': {'slot_number': 52},
     '50': {'slot_number': 53}},
    '18': {'0': {'slot_number': 54}}}


class BlocklistPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        if str(view.__class__.__name__).lower().find('store') != -1:
            if request.method == 'GET':
                return True
            else:
                if request.user.is_authenticated and request.user.is_staff:
                    return True
        elif str(view.__class__.__name__).lower().find('ticket') != -1:
            if request.method == 'POST':
                return True


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('name')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserReadSerializer
        else:
            return UserWriteSerializer


class StoreViewSet(viewsets.ModelViewSet):
    permission_classes = (BlocklistPermission,)
    queryset = Store.objects.all().order_by('name')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return StoreReadSerializer
        else:
            return StoreWriteSerializer


class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Position.objects.all().order_by('latitude')
    serializer_class = PositionSerializer


class TicketView(APIView):
    def get(self, request):
        try:
            ticket_id = request.query_params.get('ticket_id')
            # ticket_id = json.loads(request.body).get('ticket_id')

            # ticket =json.loads(serializers.serialize('json',Ticket.objects.filter(ticket_id=ticket_id),use_natural_foreign_keys=True))
            ticket = list(
                Ticket.objects.filter(ticket_id=ticket_id).values(
                    'categories_to_visit', 'time_of_request', 'assigned_to_store__location__latitude',
                    'assigned_to_store__location__longitude', 'assigned_to_store__name',
                    'assigned_to_store__location__address'))
            if len(ticket) != 0:
                ticket = ticket[0]
                content = {
                    'approximate_enter_time': str(ticket['time_of_request']),
                    'store_name': ticket['assigned_to_store__name'],
                    'lat': ticket['assigned_to_store__location__latitude'],
                    'lon': ticket['assigned_to_store__location__longitude'],
                    'address': ticket['assigned_to_store__location__address'],
                    'categories_to_visit': ticket['categories_to_visit']
                }
                return HttpResponse(json.dumps(content), content_type="application/json", status=200)
            else:
                return HttpResponse(json.dumps({"message": "not a valid ticket"}),
                                    content_type="application/json", status=400)
        except Exception as e:
            return HttpResponse(json.dumps({"message": "internal server error"}),
                                content_type="application/json", status=500)

    def post(self, request):
        try:
            data = json.loads(request.body)
            phone_number = data.get("phone_number")
            user = list(User.objects.filter(phone_number=phone_number).values())

            # user_id = user[0]['user_id']

            if len(user) == 0:
                user = User.objects.create(phone_number=phone_number)
                user_id = user.user_id
            else:
                user_id = user[0]['user_id']

            store_id = data.get('store_id')
            store_details = list(Store.objects.filter(store_id=store_id).values())
            if len(store_details) != 0:
                store_details = store_details[0]
            else:
                return HttpResponse(json.dumps({'message': 'store not found'}),
                                    content_type="application/json", status=400)
            time_of_visit = data.get('time_of_visit')

            if time_of_visit is not None:
                time_of_visit = time_of_visit[:19]
                time_of_visit = datetime.strptime(time_of_visit, '%Y-%m-%d %H:%M:%S')
                required_hours = time_of_visit.time().hour
                if required_hours > 18 or required_hours < 9:
                    return HttpResponse(
                        json.dumps({'message': 'please choose time between 09:00  and 18:00'}),
                        content_type="application/json", status=400)

                required_minutes = time_of_visit.time().minute
                temp = (required_minutes//10)*10
                slot_number = slots[str(required_hours)][str(temp)]['slot_number']
                slot_data = BookingSlot.objects.filter(
                    slot_store=store_id).filter(
                    slot_date=time_of_visit.date()).filter(
                    slot_number=slot_number)
                req_slot = list(slot_data.values())
                if len(req_slot) != 0:
                    req_slot = req_slot[0]
                    if req_slot['customers_in_slot'] < store_details['max_customers']:
                        check_if_already_booked = list(Ticket.objects.filter(assigned_to_user=user_id).filter(
                            assigned_to_store=store_id).filter(time_of_request=time_of_visit).values())
                        if len(check_if_already_booked) != 0:
                            return HttpResponse(
                                json.dumps({"message": "you already have a ticket in this slot for this store"}),
                                content_type="application/json", status=400)
                        new_ticket = Ticket.objects.create(
                            time_of_request=time_of_visit, assigned_to_user=User.objects.get(user_id=user_id),
                            assigned_to_store=Store.objects.get(store_id=store_id))
                        slot_data.update(customers_in_slot=req_slot['customers_in_slot']+1)
                        newly_created_ticket = list(Ticket.objects.filter(assigned_to_user=User.objects.get(user_id=user_id)).filter(
                            assigned_to_store=Store.objects.get(store_id=store_id)).filter(time_of_request=time_of_visit).values())[0]
                        return HttpResponse(
                            json.dumps(
                                {"ticket_id": str(newly_created_ticket['ticket_id']),
                                 "approximate_enter_time": str(newly_created_ticket['time_of_request'])}),
                            content_type="application/json", status=200)
                    else:
                        return HttpResponse(
                            json.dumps({"message": "requested time slot not available"}),
                            content_type="application/json", status=400)
                else:
                    BookingSlot.objects.create(slot_number=slot_number, slot_store=Store.objects.get(
                        store_id=store_id), slot_date=time_of_visit.date(), customers_in_slot=1)
                    new_ticket = Ticket.objects.create(
                        time_of_request=time_of_visit, assigned_to_user=User.objects.get(user_id=user_id),
                        assigned_to_store=Store.objects.get(store_id=store_id))
                    newly_created_ticket = list(Ticket.objects.filter(assigned_to_user=User.objects.get(user_id=user_id)).filter(
                        assigned_to_store=Store.objects.get(store_id=store_id)).filter(time_of_request=time_of_visit).values())[0]
                    return HttpResponse(
                        json.dumps(
                            {"ticket_id": str(newly_created_ticket['ticket_id']),
                             "approximate_enter_time": str(newly_created_ticket['time_of_request'])}),
                        content_type="application/json", status=200)
            else:
                return HttpResponse(
                    json.dumps({"message": "time of visit no available"}),
                    content_type="application/json", status=400)
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"message": "internal server error"}),
                                content_type="application/json", status=500)

    def delete(self, request, format=None):
        try:
            if request.user.is_authenticated:
                data = json.loads(request.body)
                ticket_id = data.get('ticket_id')
                ticket = Ticket.objects.get(ticket_id=ticket_id)
                if ticket is not None:
                    time_of_visit = ticket.time_of_request
                    required_hours = ticket.time_of_request.time().hour
                    required_minutes = ticket.time_of_request.time().minute
                    slot_number = slots[str(required_hours)][str((required_minutes//10)*10)]['slot_number']
                    slot_store = ticket.assigned_to_store.store_id
                    ticket.delete()
                    slot_data = BookingSlot.objects.filter(
                        slot_store=slot_store).filter(
                        slot_date=time_of_visit.date()).filter(
                        slot_number=slot_number)
                    customers_in_slot = list(slot_data.values())[0]['customers_in_slot']
                    slot_data.update(customers_in_slot=customers_in_slot-1)
                    return HttpResponse(json.dumps({}), content_type="application/json", status=200)
                else:
                    return HttpResponse(
                        json.dumps({"message": "unable to delete the ticket"}),
                        content_type="application/json", status=400)
            else:
                return HttpResponse(json.dumps({"message": "user not authenticated"}),
                                    content_type="application/json", status=400)
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"message": "internal server error"}),
                                content_type="application/json", status=500)


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


# class StoreView(APIView):
# 	def get(self,request):
# 		try:
# 			stores = Store.objects.all()
# 			stores =json.loads(serializers.serialize('json',Store.objects.all(),use_natural_foreign_keys=True))
# 			return HttpResponse(json.dumps({"data":stores}),content_type="application/json",status=200)
# 		except Exception as e:
# 			print(e)
# 			return HttpResponse(json.dumps({"message":"internal server error"}),content_type="application/json",status=500)


class UserView(APIView):
    def get(self, request):
        try:
            if self.request.user.is_authenticated:
                phone_number = self.request.user.username
                user_data = User.objects.get(phone_number=phone_number)
                tickets = list(Ticket.objects.filter(assigned_to_user=user_data).values(
                    "ticket_id", "time_of_request", "assigned_to_user__phone_number",
                    "assigned_to_store__name", "categories_to_visit", "status",
                    "assigned_to_store__current_customers", "assigned_to_store__max_customers"))
                active_tickets = []
                bookings = []
                today = date.today()
                print(tickets)
                for ticket in tickets:
                    print(ticket['time_of_request'].date())
                    if ticket['time_of_request'].date() == today and ticket['status'] == 'New':
                        content = {
                            'ticket_id': ticket['ticket_id'],
                            "time_of_visit": str(ticket['time_of_request']),
                            "phone_number": phone_number, "store_name": ticket['assigned_to_store__name'],
                            "people_in_store": ticket['assigned_to_store__current_customers'],
                            "max_customers": ticket['assigned_to_store__max_customers'],
                            "status": ticket['status']}
                        active_tickets.append(content)
                    elif ticket['time_of_request'].date() > today and ticket['status'] == 'New':
                        content = {
                            'ticket_id': ticket['ticket_id'],
                            "time_of_visit": str(ticket['time_of_request']),
                            "phone_number": phone_number, "store_name": ticket['assigned_to_store__name'],
                            "people_in_store": ticket['assigned_to_store__current_customers'],
                            "max_customers": ticket['assigned_to_store__max_customers'],
                            "status": ticket['status']}
                        bookings.append(content)
                    else:
                        continue

                content = {
                    "is_manager": user_data.isManager,
                    "active_tickets": active_tickets,
                    "bookings": bookings
                }
                return HttpResponse(json.dumps(content), content_type="application/json", status=200)
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"message": "internal server error"}),
                                content_type="application/json", status=500)


class SessionView(APIView):

    def post(self, request, format=None):
        try:
            data = json.loads(request.body)
            phone_number = data.get('phone_number')
            password = data.get('password')
            user = authenticate(username=phone_number, password=password)
            if user is None:
                isManager = False
                isUserExist = len(User.objects.filter(phone_number=phone_number).values())
                isUserInDB = len(DBUser.objects.filter(username=phone_number).values())
                if isUserInDB != 0:
                    return HttpResponse(
                        json.dumps({"message": "wrong phone number or password"}),
                        content_type="application/json", status=400)
                name = data.get('username')
                email_address = data.get('email_address')

                if not name:
                    return HttpResponse(json.dumps({"message": "Wrong phone number or password"}),
                                        content_type="application/json", status=400)

                user = DBUser.objects.create_user(username=phone_number,
                                                  password=password)
                user.save()
                if isUserExist != 0:
                    new_user = User.objects.filter(phone_number=phone_number)
                    temp = list(new_user.values())[0]
                    if name != None and email_address != None and temp['name'] == None and temp['email_address'] == None:
                        new_user.update(name=name, email_address=email_address)
                else:
                    new_user = User.objects.create(name=name, phone_number=phone_number, email_address=email_address)
            else:
                isManager = User.objects.get(phone_number=phone_number).isManager
            token = list(Token.objects.filter(user=user).values())
            if len(token) != 0:
                token = token[0]
                return HttpResponse(
                    json.dumps({"authentication_token": token['key'],
                                'isManager': isManager}),
                    content_type="application/json", status=200)
            else:
                token = Token.objects.create(user=user)
                return HttpResponse(
                    json.dumps({"authentication_token": token.key, 'isManager': isManager}),
                    content_type="application/json", status=200)
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"message": "internal server error"}),
                                content_type="application/json", status=500)

    def delete(self, request, format=None):
        try:
            data = json.loads(request.body)
            token = data.get('authentication_token')
            Token.objects.get(key=token).delete()
            return HttpResponse(json.dumps({"message": "successfully deleted session"}),
                                content_type="application/json", status=200)
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"message": "unable to delete session"}),
                                content_type="application/json", status=200)
