const express = require('express');
apiController = require('../controllers/item')
const mainRouter = express.Router();

mainRouter.get('/', apiController.getItems);

mainRouter.post('/', apiController.createItem);

module.exports = mainRouter;

