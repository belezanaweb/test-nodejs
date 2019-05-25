### Backend Test
[![Build Status](https://travis-ci.org/belezanaweb/test-nodejs.svg?branch=master)](https://travis-ci.org/belezanaweb/test-nodejs)


```
$ curl 'http://localhost:3000/products' -H 'content-type: application/json' -d '{"sku": "3019"}'

$ curl 'http://localhost:3000/products' -H 'content-type: application/json' -d '{"sku": "24410", "inventory": { "warehouses": [{"quantity": 3}, {"quantity": 15}] }}'
$
```
