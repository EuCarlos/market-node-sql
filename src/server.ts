import express, { Request, Response } from 'express';
require("dotenv").config();
const bodyParser = require('body-parser');

import swaggerUI from 'swagger-ui-express';
import swaggerDOCs from './docs/swagger.json';
import { allRoutes } from './utils/environment';

const customerRoutes = require('./routes/customers.routes');
const productsRoutes = require('./routes/products.routes');
const citiesRoutes = require('./routes/cities.routes');

const app = express();

const PORT = process.env.PORT || 3333;

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

    .use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDOCs))

    .use('/api/customers', customerRoutes)
    .use('/api/products', productsRoutes)
    .use('/api/cities', citiesRoutes)
    
    .get('*', (req: Request, res: Response) => {
        res.status(404).json({
           message: "This route doesn't exist, check the documentation.",
           existingRoutes: allRoutes
        })
    })

    .listen(PORT, () => {
        console.log(`🔥 Server is running in PORT ${PORT} - ${process.env.NODE_ENV}`)
    });