sudo docker-compose -f production.yaml stop reverse-proxy
sudo certbot certonly --standalone --agree-tos -m "info@domain.com" -n -d pplex.gavillet-cie.com,www.pplex.gavillet-cie.com
sudo docker-compose -f production.yaml up -d reverse-proxy
sudo docker image prune -f