FROM nginx:alpine
# set environment variables
ARG google_api_key="I will be replaced"
ARG google_client_id="I will be replaced"

RUN echo "Test out -> ${google_api_key}"

ENV GOOGLE_API_KEY=${google_api_key}
ENV GOOGLE_CLIENT_ID=${google_client_id}

COPY ./build /var/www
RUN printf "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID\nGOOGLE_API_KEY=$GOOGLE_API_KEY" > /var/www/.env
RUN cat /var/www/.env
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]