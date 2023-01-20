import express from 'express';
const router = express.Router();

import customerController from '@controllers/customer.controller';
import salesRegistrationController from '@controllers/sales_registration.controller';

router
    .get('/', customerController.show)
    .get('/count', customerController.count)
    .get('/:id', customerController.index)
    .post('/', customerController.create)
    .put('/:id', customerController.update)
    .delete('/:id', customerController.destroy)
    
    .get('/:customerId/purchase', salesRegistrationController.show)
    .get('/:customerId/purchase/:purchaseId', salesRegistrationController.index)
    .post('/purchase', salesRegistrationController.create)
    .delete('/purchase/:id', salesRegistrationController.destroy);

module.exports = router;