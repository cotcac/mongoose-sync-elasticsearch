
# MongoDB and ElasticSearch Synchronization
We are assuming that MongoDB is our primary database and ElasticSearch is our secondary database. This means that we will add/delete/update the data in MongoDB first and then ElasticSearch.

# Flow

![Alt][1]

[1]: /mongoose-elasticsearch.png "Title"

# Install elasticsearch with Docker
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#_pulling_the_image
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.0
```
## development mode
```
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.0
```

# Install Logstash
```
docker pull docker.elastic.co/logstash/logstash:7.4.0

```
## Test install
http://localhost:9200

## Postman

https://documenter.getpostman.com/view/7994605/SVzuagF4?version=latest

# Reference and credit
https://codeforgeek.com/mongodb-elasticsearch-synchronization/