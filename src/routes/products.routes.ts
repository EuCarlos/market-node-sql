import express from 'express';
const router = express.Router();

import ProductController from '@controllers/product.controller';

router
    .get('/', ProductController.show)
    .get('/:id', ProductController.index)
    .post('/', ProductController.create)
    .put('/:id', ProductController.update)
    .delete('/:id', ProductController.destroy);

module.exports = router;