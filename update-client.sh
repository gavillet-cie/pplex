sudo docker-compose -f production.yaml pull nuxt
sudo docker-compose -f production.yaml stop nuxt
sudo docker-compose -f production.yaml up -d nuxt
sudo docker image prune -f