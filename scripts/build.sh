#!/bin/sh
## The environment variables are set in the pipeline
echo "Building the ${FRONTEND}\n"
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_API_KEY
docker build -t $FRONTEND --build-arg google_client_id=$GOOGLE_CLIENT_ID --build-arg google_api_key=$GOOGLE_API_KEY .
docker push $FRONTEND
