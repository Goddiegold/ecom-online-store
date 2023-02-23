import random
import re
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf  import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,logout
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import CategorySerializer,ProductSerializer, UserSerializer,OrderSerializer
from .models import Category, Product,CustomUser, Order
import braintree

# Create your views here.

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)] + [str(i) for i in range(10)] ) for _ in range(length))

def home(request):
    pass


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

@csrf_exempt
def login_view(request):

    if not request.method == 'POST':
        return JsonResponse({'error':'Send a post request with valid parameter!'})
    
    username = request.POST['email']
    password = request.POST['password']

    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error':'Enter a valid email'})

    if len(password) < 3:
        return JsonResponse({'error':'Password needs to be at least 3 chars'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            print(user)
            usr_dict = UserModel.objects.filter(email=username).values().first()
            usr_dict.pop('password')

            if  user.session_token != "0":
                user.session_token ="0"
                user.save()
                return JsonResponse({'error':"Previous session exists!"})
            
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({'token':token, 'user':usr_dict})
        else :
            return JsonResponse({'error':'Invalid Response'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid Email'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create':[permissions.AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]



def logout_view(request, id):
        logout(request)

        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=id)
            user.session_token = "0"
            user.save()
        except UserModel.DoesNotExist:
            return JsonResponse({'errror':'Invalid User ID'})

        return JsonResponse({'success':'Logout success!'})


def validate_user_session(id,token):
    """this function validates user session id(current user id), token(user token)"""
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        print(user.email)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False



@csrf_exempt
def add_order_view(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'Please login!','code':'1'})
    
    if request.method == "POST":
        user_id = id
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']        
        products = request.POST['products'] 
        total_products = len(products.split(",")[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error':'User does not exist'})   

        order = Order(user=user, 
        product_names=products,
        transaction_id=transaction_id,
        total_amount=amount,
        total_products=total_products
        )  
        order.save()
        return JsonResponse({'success':True,'error':False, 'msg':'Order placed Successfully!'})



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer




gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="zjcjc5qq8q5zx9mg",
        public_key="4bpmqpzvkk6fnf9m",
        private_key="18f8560cf18a5a8aaff938cf7227f72e"
    )
)

@csrf_exempt
def generate_payment_token(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'Invalid session, Pls login again!'})

    return JsonResponse({'clientToken':gateway.client_token.generate(), 'success':True}) 


@csrf_exempt
def process_payment(requset,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'Invalid session, Pls login again!'})

    nonce_from_the_client = requset.POST['paymentMethodNonce']
    amount_from_the_client = requset.POST['amount']


    result = gateway.transaction.sale({
         "amount": amount_from_the_client,
    "payment_method_nonce": nonce_from_the_client,
    # "device_data": device_data_from_the_client,
    "options": {
      "submit_for_settlement": True
    }
    })

    print(result)

    if result.is_success:
        return JsonResponse({'success':result.is_success,
        'transaction':{'id':result.transaction.id,
        'amount':result.transaction.amount, }
        })
    else:
        return JsonResponse({'error':True,'success':False})

