# FROM alpine:latest

# WORKDIR /app


# RUN apk fetch openjdk8 \
# && apk add openjdk8
# ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
# ENV PATH="$JAVA_HOME/bin:${PATH}"


# RUN apk add python3 py3-pip \
# && apk add --upgrade bash


# COPY . /app/


FROM node:alpine 

WORKDIR /app

RUN apk update \
&& apk add build-base \
&& apk add g++

RUN apk add --upgrade bash

# RUN [ "chmod","+x", "./judge.sh" ]
# RUN chmod 0755  /app/judge.sh
# ENTRYPOINT [ "./judge.sh" ]

COPY package.json /app/
RUN npm install
EXPOSE 3009

COPY . /app/

CMD ["npm", "run", "dev"]
