# Wonderful Nodejs API
Nodejs - Product Mock API

## About
- Simple RestFul API: 
  - ``` PUT /product ``` to add a new product
  - ``` GET /product/{sku} ``` to get product by sku, and there's more, you also get a json informing you if it's marktable and the total quantity, 
  that's why it's wonderful
  - ``` UPDATE /product/update ``` to update product by sku
  - ``` DELETE /product/{sku} ``` to ~kill the poor existence of the~ delete product by sku
  
- Attempt to prove that query builders are better than ORM's, using only commonjs, proving it's still cool to not use TypeScript
- But also the irony's tests striked, proving also that not using force me to construct two separables tables and update function total destroyed 
the uuid existence or utility

## What I would do if I had more time:
1. **Use Typescript**
1. Use ORM or at least a noSQL for more scalability
1. Probably bash my head against the keyboard for using Typescript after I build the final version.
1. Add a couple more nice actions to take advantage of uuid of the warehouses.

## Pre-Setup
- I strongly recommend to install **Postgres 13** in your lovely machine and also **Postman** to import the collection 
tests located in [this folder](https://github.com/vitorqueijo/test-nodejs/tree/master/__postman_doc__) (jest testing are a dream to be by now)

## Setup - Eazy Peezy Lemon Squeezy

- First of all, clone this repository in your local machine ``` git clone {this url repository} ```

- Once inside the project module, run the installation (using yarn, of course, if you don't have it, run: ```npm install --global yarn```), then:
``` yarn ```

## Running
Just use the already made scripts in packages.json

- Development: ``` yarn run dev ```

- Production: ``` yarn run start ```
