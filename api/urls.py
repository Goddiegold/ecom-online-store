from django.urls import path, include
# from rest_framework.authtoken import views
# from .views import home
# from rest_framework import routers
from rest_framework_nested import routers
from . import views as api_views
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register('category', api_views.CategoryViewSet, basename='category')
router.register('products', api_views.ProductViewSet, basename='products')
router.register('user',api_views.UserViewSet, basename='user')
router.register('order',api_views.OrderViewSet,basename='order')

# users_router = routers.NestedDefaultRouter(router,
# 'users', lookup='user')
# users_router.register('login',views.login_view,basename='signin')
# users_router.register('logout',views.logout_view,basename='signout')



urlpatterns = [
    # path('', home, name='api.home'),
    # path('category/', include('category.urls')),
    # path('products/', include('product.urls'))

    #user login and logout
    path('user/login/',api_views.login_view,name='signin'),
    path('user/logout/<int:id>/',api_views.logout_view,name='signout'),

    #route to order products
    path('order/add/<str:id>/<str:token>/',api_views.add_order_view,name='add_order'),

    #route to make payments and generate payment token
    path("payment/get-token/<str:id>/<str:token>/", api_views.generate_payment_token, name="generate_payment_token"),
    path("payment/process/<str:id>/<str:token>/", api_views.process_payment, name="process_payment"),

    #route to get api auth token
    path('api-token-auth/',views.obtain_auth_token,name="api_token_auth")


]

urlpatterns += router.urls



