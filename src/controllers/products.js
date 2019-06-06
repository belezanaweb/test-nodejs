const express = require('express');
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const getProduct = (req, res) => {
    const sku = req.params.sku;

    if (sku) {
        Product.find({ sku })
            .then(data => {
                data.map(item => {
                    const total = item.inventory.warehouses.reduce(function(a, b) {
                        return a.quantity + b.quantity;
                    });
                    item.inventory.quantity = total;

                    if(item.inventory.quantity > 0)
                        item.isMarketable = true;
                });

                res.send(data);
            })
            .catch(err => res.send(err));
    } else {
        res.json({ response: 'Informe o sku para buscar o produto!' })
    }
};

const createProduct = (req, res) => {
    if (req.body) {
        const { sku } = req.body; 
        console.log(sku);
        Product.find({ sku })
            .then(data => {
                if(data.length === 0) {
                    Product.create(req.body)
                        .then(data => res.send({
                            status: 200,
                            response: 'Produto Cadastrado :D',
                            data
                        }))
                        .catch(err => res.send(err));
                } else {
                    res.send({ response: "Já existe um produto com esse sku cadastrado!"})
                };
            })
            .catch(err => res.send(err));
    } else {
        res.json({ response: 'Envie todas as propriedades do produto para cadastrar!' })
    }
};

const updateProduct = (req, res) => {
    const sku = req.params.sku;
    if (sku) {
        Product.updateOne({ sku }, req.body)
            .then(data => res.send({
                status: 200,
                response: 'Produto Atualizado :D',
                nModified: data.nModified,
            }))
            .catch(err => res.send(err));
    } else {
        res.json({ response: 'Informe o sku para atualizar o produto!' })
    }
};

const deleteProduct = (req, res) => {
    const sku = req.params.sku;
    if (sku) {
        Product.deleteOne({ sku })
            .then(data => res.send({
                status: 200,
                response: 'Produto Excluído',
            }))
            .catch(err => res.send(err));
    } else {
        res.json({ response: 'Informe o sku para excluir o produto!' })
    }
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };