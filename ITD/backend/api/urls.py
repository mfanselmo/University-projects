from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users',views.UserViewSet)
router.register(r'tickets',views.TicketViewSet)
router.register(r'store',views.StoreViewSet)
router.register(r'position',views.PositionViewSet)
urlpatterns = [
	path('', include(router.urls)),
	# path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
	path('create-user',views.create_user),
	path('get-token',views.get_token)
]