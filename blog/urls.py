from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.home, name='home'),
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('tag/<slug:slug>/', views.tag_posts, name='tag_posts'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('social/', views.social, name='social'),
    path('report-phishing/', views.report_phishing, name='report_phishing'),
]