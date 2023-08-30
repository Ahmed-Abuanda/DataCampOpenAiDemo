from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import boto3
import openai

ssm = boto3.client("ssm")

openAIKey = ssm.get_parameter(Name="OpenaiAPIKey", WithDecryption=True)["Parameter"]["Value"]
openai.api_key = openAIKey

def index(request):
    return render(request, "index.html")

def sentiment_page(request):
    return render(request, "sentiment.html")

def keywords_page(request):
    return render(request, "keywords.html")

def summary_page(request):
    return render(request, "summary.html")

@csrf_exempt
def run_sentiment_analysis(request):
    text_prompt = request.POST["text_prompt"]
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Classify the sentiment of the given text as either Positive, Negative or Neutral: {text_prompt}",
        temperature=0.5,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    sentiment = response.choices[0].text.strip()
    return JsonResponse({"result": sentiment})

@csrf_exempt
def run_keyword_extraction(request):
    text_prompt = request.POST["text_prompt"]
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Extract the most prominent keywords from the following text: {text_prompt}",
        temperature=0.5,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    keywords = [i.replace("-","").strip() for i in response.choices[0].text.split("\n") if i != ""]
    return JsonResponse({"keywords": keywords})

@csrf_exempt
def run_keyword_extraction(request):
    text_prompt = request.POST["text_prompt"]
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Extract the most prominent keywords from the following text: {text_prompt}",
        temperature=0.5,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    keywords = [i.replace("-","").strip() for i in response.choices[0].text.split("\n") if i != ""]
    return JsonResponse({"keywords": keywords})

@csrf_exempt
def run_text_summary(request):
    text_prompt = request.POST["text_prompt"]
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Please summarize the following text keeping all meaning, to a maximum of one or two sentances: {text_prompt}",
        temperature=0.5,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    summary = response.choices[0].text.strip()
    return JsonResponse({"summary": summary})

