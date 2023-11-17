const express = require('express');
itemController = require('../controllers/item')
const mainRouter = express.Router();

mainRouter.get('/item', itemController.getItems);

mainRouter.post('/item', itemController.createItem);

mainRouter.delete('/item', itemController.delItem);

module.exports = mainRouter;

