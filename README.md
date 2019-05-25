### Backend Test


```
curl 'http://localhost:3000/products' -H 'content-type: application/json' -d '{"sku": "3019"}'

curl 'http://localhost:3000/products' -H 'content-type: application/json' -d '{"sku": "24410", "inventory": { "warehouses": [{"quantity": 3}, {"quantity": 15}] }}'
```


```
docker build -t wbruno/test-nodejs .

docker run -p 3000:3000 -d wbruno/test-nodejs
```
