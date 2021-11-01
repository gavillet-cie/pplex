sudo docker-compose -f production.yaml pull cms
sudo docker-compose -f production.yaml stop cms
sudo docker-compose -f production.yaml up -d cms
sudo docker image prune -f