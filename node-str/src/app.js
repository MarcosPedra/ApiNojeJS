'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Conectar ao banco de dados
mongoose.connect(config.connectionString, 
{ useCreateIndex: true, useNewUrlParser: true });

// Carregar models
const Product = require('./Models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregar rotas
const index = require('./Routes/Index');
const products = require('./Routes/products');
const customerRoute = require('./Routes/customer-route');
const orderRoute = require('./Routes/order-route');

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilitar o CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', index);
app.use('/products', products);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;

// node-uuid verificar