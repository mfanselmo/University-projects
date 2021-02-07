from django.test import TestCase
from .models import Store
from .models import Ticket
from .models import User
from .models import Position

# Create your tests here.
class StoresTestCase(TestCase):
      
      def setUp(self):
            Store.objects.create(
                  store_id = 1,
                  location = Position.objects.create(
                      address = "via tartini",
                      latitude = 93.887,
                      longitude = 87.453
                  ),
                  max_customers = 50,
                  current_customers = 50,
                  name = "CONAD"
            )
            Store.objects.create(
                  store_id= 2,
                  location = Position.objects.create(
                      address = "via tartini",
                      latitude = 93.887,
                      longitude = 87.453
                  ),
                  max_customers = 70,
                  current_customers = 3,
                  name = "CONAD"
            )
            
             
            """ 
            User.objects.create(
                  user_id = 3,
                  name = "martin",
                  phone_number = "+393333333333",
                  email_address = "martin@gmail.com",
                  managed_store_id = 2
            )
                   
            Ticket.objects.create(
                  ticket_id = "00000001",
                  status = 'New',
                  assigned_to_user = 3,
                  assigned_to_store = 1,
                  categories_to_visit = 'groceries',
            )
            """

      def newCustomer(store):
            if  store.current_customers != store.max_customers:
                  store.current_customers +=1
                  
      def leftCustomer(store):
            if  store.current_customers != 0:
                  store.current_customers -= 1
            
            
      def test_store_update(self):
            store_1 = Store.objects.get(store_id=1)
            store_2 = Store.objects.get(store_id=2)
            #newCustomer(store_1)
            #newCustomer(store_2)
            self.assertEqual(store_1.current_customers, store_1.max_customers)
            self.assertNotEqual(store_2.current_customers, store_2.max_customers)
      """
      def test_booking(self):
            store = Store.objects.get(store_id=1)
            ticket = Ticket.objects.get(store_id="00000001")
            self.assertEqual(ticket.assigned_to_store, store.store_id)
      """