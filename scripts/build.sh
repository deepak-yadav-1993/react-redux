#!/bin/sh
echo "Building the ${FRONTEND}\n"
docker build -t $FRONTEND .
docker push $FRONTEND
