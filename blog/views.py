from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import send_mail
from django.conf import settings
from .models import Post, Tag, Message


def home(request):
    posts = Post.objects.filter(published=True).order_by('-created_at')[:3]
    return render(request, 'home.html', {'posts': posts})


def blog_list(request):
    posts_list = Post.objects.filter(published=True).order_by('-created_at')
    tags = Tag.objects.all()
    query = request.GET.get('q')
    if query:
        posts_list = posts_list.filter(Q(title__icontains=query) | Q(content__icontains=query))
    
    paginator = Paginator(posts_list, 10)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    
    return render(request, 'blog_list.html', {'posts': posts, 'tags': tags, 'query': query})


def blog_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, published=True)
    all_published = Post.objects.filter(published=True).order_by('-created_at')
    post_list = list(all_published)
    
    idx = post_list.index(post) if post in post_list else -1
    prev_post = post_list[idx - 1] if idx > 0 else None
    next_post = post_list[idx + 1] if idx < len(post_list) - 1 else None
    
    return render(request, 'blog_detail.html', {
        'post': post,
        'prev_post': prev_post,
        'next_post': next_post
    })


def tag_posts(request, slug):
    tag = get_object_or_404(Tag, slug=slug)
    posts = tag.posts.filter(published=True).order_by('-created_at')
    return render(request, 'tag_posts.html', {'tag': tag, 'posts': posts})


def about(request):
    return render(request, 'about.html')


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Save message to database
        Message.objects.create(name=name, email=email, subject=subject, message=message)
        
        # Send email notification
        try:
            full_message = f"From: {name} <{email}>\nSubject: {subject}\n\n{message}"
            send_mail(
                f"[cy613h] {subject}",
                full_message,
                email,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email error: {e}")
        
        return render(request, 'contact.html', {'success': True})
    return render(request, 'contact.html')


def social(request):
    return render(request, 'social.html')


def report_phishing(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        Message.objects.create(name=name, email=email, subject=subject, message=message)
        
        try:
            full_message = f"From: {name} <{email}>\nSubject: {subject}\n\n{message}"
            send_mail(
                f"[cy613h PHISHING REPORT] {subject}",
                full_message,
                email,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email error: {e}")
        
        return render(request, 'report_phishing.html', {'success': True})
    return render(request, 'report_phishing.html')