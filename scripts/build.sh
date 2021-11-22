#!/bin/sh

## The environment variables are set in the pipeline
docker build -t $FRONTEND .
docker push $FRONTEND
