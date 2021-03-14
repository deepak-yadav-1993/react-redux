FROM node:14.16-alpine
# setting up PORT environment variable
ENV PORT=3000
ENV DBPWD=dipvik
# setting the work direcotry
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install

COPY . .
RUN npm run swagger-autogen

EXPOSE 3000

CMD ["npm", "start"]