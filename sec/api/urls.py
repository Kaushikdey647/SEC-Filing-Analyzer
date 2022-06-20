from django.urls import path
from . import views

urlpatterns = [ 
    path('', views.getAll), #q as the form paramter
    path('bs',views.getBS),
    path('stock',views.getStock),
    path('strict',views.getStrict), #q as the form paramter
    path('pred',views.getPred), #q as the form paramter
    path('<str:pk>',views.getId), 
]