FROM fabiocicerchia/nginx-lua:alpine

COPY ./nginx-ssl.conf /etc/nginx/nginx.conf
COPY ./services/pictures /var/www/html/services/pictures
COPY ./google8f85531d1eeeaa63.html /var/www/html/google8f85531d1eeeaa63.html
COPY ./bin /bin
RUN chmod +x /bin/purge-cache.sh
RUN mkdir -p /data/nginx/cache
RUN mkdir -p /etc/cron.d

RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN rm -rf /var/lib/apt/lists/* \
  && echo "PATH=$PATH" > /etc/cron.d/certbot-renew  \
  && echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew \
  && crontab /etc/cron.d/certbot-renew

VOLUME /etc/letsencrypt

CMD [ "sh", "-c", "crond && nginx -g 'daemon off;'" ]

EXPOSE 8080