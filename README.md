Ubuntu 18.04 LTS

Update certificate in nginx
---

Ask for domain name

Setup SSH keys
---
On server

```
ssh-keygen -t rsa -b 4096
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_rsa

// Copy id_rsa content to .pem file on client computer
sudo chmod 400 file.pem
```

Backup volume
--- 

```
ssh -i jenisch.pem ubuntu@195.15.240.248
```
```
// Stop running container

sudo docker-compose -f production.yaml stop cms
```
```
// Backup cms assets

sudo docker run --rm --volumes-from pplex_cms_1 -v ~/backup:/backup ubuntu bash -c "cd /var/www/html/api/site/assets && tar cvf /backup/assets.tar ."
```
```
// Download assets

scp -r -i jenisch.pem ubuntu@195.15.240.248:/home/ubuntu/backup ./backup
```

```
// Upload assets

scp -r -i jenisch.pem ./backup ubuntu@195.15.240.248:/home/ubuntu
```

Upload
---

```
// Upload config & assets
scp -r -i jenisch.pem pplex ubuntu@195.15.242.251:/home/ubuntu/pplex
```

Add DNS record
---

Add A record that points to the instance IP

Install dependencies
---

Install docker see: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
```
sudo apt-get update
```
```
sudo apt-get install docker-ce docker-ce-cli docker-compose containerd.io
```



Install certbot
---

```
sudo add-apt-repository ppa:certbot/certbot
```
```
sudo apt install python-certbot-apache
```
```
// Stop running processec on port 80

sudo apt-get install psmisc
sudo fuser 80/tcp
sudo lsof -t -i tcp:80 -s tcp:listen | sudo xargs kill
```
```
// IMPORTANT: Update domains

sudo certbot certonly --standalone --agree-tos -m "info@domain.com" -n -d pplexbeta.gavillet-cie.com,www.pplexbeta.gavillet-cie.com
```

Bundle certificates
---

```
cat your_domain.crt intermediate.crt root.crt >> ssl-bundle.crt

// Nginx config

ssl_certificate /etc/ssl/ssl-bundle.crt;
ssl_certificate_key /etc/ssl/ssl.key;
```

Run containers
---

IMPORTANT: Update certificates path in nginx.conf

```
sudo chmod -R 777 backend/
```
```
sudo docker-compose -f production.yaml up -d
```

Import pplex db
---

Use adminer

Make scripts executable
---

```
sudo chmod +x update-client.sh
```
```
sudo chmod +x update-backend.sh
```

Add crontab for certbot
---

Add this container to the docker-compose config

```
reverse-proxy:
    depends_on:
      - nuxt
      - cms
      - adminer
      - mysql
    image: ghcr.io/gavillet-cie/jenisch-proxy:main
    ports:
      - 80:8080
      - 443:443
    restart: on-failure
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt/:ro
      - /certbot/www:/var/www/certbot/:ro
      
certbot:
    image: certbot/certbot:latest
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt/:rw
      - /certbot/www:/var/www/certbot/:rw
```

```
sudo apt install cron
sudo systemctl enable cron

// Edit crontab
crontab -e

// If the certificate does not exist yet
sudo docker-compose -f production.yaml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d example.org

// Paste this into the crontab file
0 1 * * * sudo docker-compose -f production.yaml run --rm certbot renew
```
