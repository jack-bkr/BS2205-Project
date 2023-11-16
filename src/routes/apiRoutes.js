const express = require('express');
itemController = require('../controllers/item')
const mainRouter = express.Router();

mainRouter.get('/item', itemController.getItems);

mainRouter.post('/item', itemController.createItem);

module.exports = mainRouter;

