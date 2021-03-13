#!/bin/sh
echo "Building the ${IMAGE_NAME}\n"
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME
