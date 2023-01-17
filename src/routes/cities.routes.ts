import express from 'express';
const router = express.Router();

import CityController from '@controllers/city.controller';

router
    .get('/', CityController.show)
    .get('/:id', CityController.index);

module.exports = router;