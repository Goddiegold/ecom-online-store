from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Category, Product, CustomUser, Order

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description']


class ProductSerializer(serializers.HyperlinkedModelSerializer):

    image = serializers.ImageField(
        max_length=None, 
        allow_empty_file=False,
        allow_null=True,
        required=False
    )
    class Meta:
        model = Product
        fields = ['id','name','description', 'price', 'image', 'category']



class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance 

    def update(self, instance, validated_data):
        for attr,value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {
            'password':{'write_only':True}
        }
        fields = ['name', 'email', 'password', 'phone', 'gender', 'is_staff', 'is_superuser']




class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['user']
        #TODO: add product and quantity