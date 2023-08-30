FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN echo 'building'

RUN pip install --upgrade pip

WORKDIR /app

COPY .env .

COPY ./requirements.txt .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y gettext

COPY ./ProjectSite .

EXPOSE 8000

# Start the server when the container is run
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
