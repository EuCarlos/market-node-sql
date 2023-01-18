import express from 'express';
const router = express.Router();

import customerController from '@controllers/customer.controller';

router
    .get('/', customerController.show)
    .get('/:id', customerController.index)
    .post('/', customerController.create)
    .put('/:id', customerController.update)
    .delete('/:id', customerController.destroy);

module.exports = router;