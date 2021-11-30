Ubuntu 18.04 LTS

Backup volume
--- 

```
// Stop running container

sudo docker-compose -f production.yaml stop cms
```
```
// Backup cms assets

sudo docker run --rm --volumes-from pplex_cms_1-v ~/backup:/backup ubuntu bash -c "cd /var/wwwhtml/api/site/assets && tar cvf /backup/assetstar ."
```
```
// Download assets

scp -r -i jenisch.pem ubuntu@195.15.240.248:home/ubuntu/backup ./backup
```

Upload
---

```
// Upload config & assets
scp -r -i jenisch.pem pplex ubuntu@195.15.242.237:/home/ubuntu/pplex
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

sudo kill -9 `sudo lsof -t -i:80`
```
```
certbot certonly --standalone --agree-tos -m "info@domain.com" -n -d pplexbeta.gavillet-cie.com,www.pplexbeta.gavillet-cie.com
```

Run containers
---

Update certificates path in nginx.conf

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
