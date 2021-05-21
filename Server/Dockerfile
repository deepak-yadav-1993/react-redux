FROM node:14.16-alpine
# setting up PORT environment variable
RUN echo $db_pass
RUN echo $server_port
ENV PORT=$server_port
ENV DBPWD=$db_pass
# setting the work direcotry
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install

COPY . .
RUN npm run swagger-autogen

EXPOSE 3000

CMD ["npm", "start"]