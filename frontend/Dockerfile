# Dockerfile
FROM node:14-alpine

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add python3 make g++

# copy the app, note .dockerignore
COPY . .
RUN rm -rf node_modules
RUN yarn install
RUN yarn build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD [ "yarn", "start" ]
