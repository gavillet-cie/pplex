FROM fabiocicerchia/nginx-lua:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./bin /bin
RUN chmod +x /bin/purge-cache.sh
RUN mkdir -p /data/nginx/cache
RUN mkdir -p /etc/cron.d

ARG CERTBOT_EMAIL=info@domain.com
ARG DOMAIN_LIST=pplex.gavillet-cie.com

RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN certbot certonly --standalone --agree-tos -m "${CERTBOT_EMAIL}" -n -d ${DOMAIN_LIST} \
  && rm -rf /var/lib/apt/lists/* \
  && echo "PATH=$PATH" > /etc/cron.d/certbot-renew  \
  && echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew \
  && crontab /etc/cron.d/certbot-renew

VOLUME /etc/letsencrypt

CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]

EXPOSE 8080