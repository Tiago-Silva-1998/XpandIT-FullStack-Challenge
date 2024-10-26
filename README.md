# XpandIT FullStack Challenge
 
Setup (With docker):
- Install docker and docker-compose
- RUN: docker compose build
- RUN: docker compose up -d
- Access http://localhost:8080/app

Setup (Without docker):
- Install: Node.JS and ElasticSearch
- Make sure "xpack.security.enabled=false" in elasticsearch.yml
- RUN: npm install
- RUN: npm run build
- RUN: npm run build_db
- RUN: npm run start
- Access http://localhost:8080/app