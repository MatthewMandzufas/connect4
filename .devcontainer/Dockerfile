FROM nginx:stable-alpine3.19-slim

RUN apk add python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo certbot-nginx
RUN mkdir /etc/letsencrypt

COPY startup.sh .
ENTRYPOINT ["/startup.sh"]

WORKDIR /usr/share/nginx/html
COPY dist/. /
COPY default.conf /etc/nginx/conf.d/default.conf
