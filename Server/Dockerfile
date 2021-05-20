FROM node:14.16-alpine
# setting up PORT environment variable
ENV PORT=$SERVER_PORT
ENV DBPWD=$DBPWD
# setting the work direcotry
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install

COPY . .
RUN npm run swagger-autogen

EXPOSE 3000

CMD ["npm", "start"]