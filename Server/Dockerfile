FROM node:12.11.1-alpine
# setting up PORT environment variable
ENV PORT=3000
# setting the work direcotry
WORKDIR /usr/src/app

COPY package*.json .
RUN npm clean-install

COPY . .
RUN npm run swagger-autogen

EXPOSE 3000

CMD ["npm", "start"]