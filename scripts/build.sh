#!/bin/sh
echo "Building the"
docker build -t deepaky193/personal_finance_app:latest .
docker push deepaky193/personal_finance_app:latest