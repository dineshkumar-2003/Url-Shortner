from django.urls import path
from UrlShortner.views import ShortenURLView, RedirectView, AnalyticsView

urlpatterns = [
    path('api/shorten/', ShortenURLView.as_view(), name='shorten'),
    path('api/analytics/<str:code>/', AnalyticsView.as_view(), name='analytics'),
    path('<str:code>/', RedirectView.as_view(), name='redirect'),
]
