sudo docker-compose -f production.yaml pull reverse-proxy
sudo docker-compose -f production.yaml stop reverse-proxy
sudo docker-compose -f production.yaml up -d reverse-proxy
sudo docker image prune -f