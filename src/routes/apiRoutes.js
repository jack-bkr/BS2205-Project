const express = require('express');
const itemController = require('../controllers/item')
const userController = require('../controllers/user')
const apiRouter = express.Router();

// API item routes

apiRouter.get('/item', itemController.getItems);

apiRouter.get('/itemid', itemController.getIDs); // Test

apiRouter.get('/item/:id', itemController.getItemByID);

apiRouter.post('/item', itemController.createItem);

apiRouter.delete('/item', itemController.delItem);

// API user routes

apiRouter.post('/user/login', userController.login);

apiRouter.post('/user', userController.createUser);

apiRouter.get('/user/:id', userController.getUser);

module.exports = apiRouter;

