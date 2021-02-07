from django.test import TestCase
from .models import Store

# Create your tests here.
class StoresTestCase(TestCase):
      
    def setUp(self):
        Store.objects.create(store_id = 1,
                             location = 1,
                             max_customers = 50,
                             current_customers = 0,
                             name = "CONAD")
        Store.objects.create(store_id= 2,
                             location = 2,
                             max_customers = 70,
                             current_customers = 3,
                             name = "CONAD")

    def test_store_update(self):
        """Animals that can speak are correctly identified"""
        lion = Animal.objects.get(name="lion")
        cat = Animal.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')
    
    
    def test_store_update(self):
        """Animals that can speak are correctly identified"""
        lion = Animal.objects.get(name="lion")
        cat = Animal.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')
      
