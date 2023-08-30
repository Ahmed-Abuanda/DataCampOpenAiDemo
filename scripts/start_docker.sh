#!/bin/sh

docker build -t openaidemo .
docker run -p 8000:8000 opanaidemo