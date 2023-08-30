from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from . import views
app_name = "main"

urlpatterns = [
  #Pages
  path('', views.index, name="index"),
  path('sentiment', views.sentiment_page, name="sentiment_page"),
  path('keywords', views.keywords_page, name="keywords_page"),
  path('summary', views.summary_page, name="summary_page"),

  #API Calls
  path('run_sentiment_analysis', views.run_sentiment_analysis, name="run_sentiment_analysis"),
  path('run_sentiment_analysis', views.run_sentiment_analysis, name="run_sentiment_analysis"),
  path('run_text_summary', views.run_text_summary, name="run_text_summary"),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
