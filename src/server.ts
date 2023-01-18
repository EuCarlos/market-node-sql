import express from 'express';
require("dotenv").config();
const bodyParser = require('body-parser')

const customerRoutes = require('./routes/customers.routes');
const productsRoutes = require('./routes/products.routes');
const citiesRoutes = require('./routes/cities.routes');

const app = express();

const PORT = process.env.PORT || 3333;

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    
    .use('/api/customers', customerRoutes)
    .use('/api/products', productsRoutes)
    .use('/api/cities', citiesRoutes)

    .listen(PORT, () => {
        console.log(`🔥 Server is running in PORT ${PORT} - ${process.env.NODE_ENV}`)
    });