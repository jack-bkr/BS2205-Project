const express = require('express');
itemController = require('../controllers/item')
const apiRouter = express.Router();

apiRouter.get('/item', itemController.getItems);

apiRouter.get('/itemid', itemController.getIDs); // Test

apiRouter.get('/item/:id', itemController.getItemByID);

apiRouter.post('/item', itemController.createItem);

apiRouter.delete('/item', itemController.delItem);

module.exports = apiRouter;

