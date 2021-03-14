#!/bin/sh
## The environment variables are set in the pipeline
echo "Building the ${FRONTEND}\n"
docker build -t $FRONTEND .
docker push $FRONTEND
