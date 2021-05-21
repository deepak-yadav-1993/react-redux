FROM node:14.16-alpine
# These ARG value will be overridden by the pipeline --build-arg command
ARG server_port="I will be replaced" 
ARG db_pass="I will be replaced"

ENV SERVER_PORT=${server_port}
ENV DBPWD=${db_pass}

# setting the work direcotry
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install

COPY . .
RUN npm run swagger-autogen

EXPOSE 3000

CMD ["npm", "start"]