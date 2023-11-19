const express = require('express');
const itemRouter = express.Router();
const path = require('path');

const dbURL = require('../../dbURL.json');

itemRouter.get('', function (req, res) {  // get request to root path
    try {
        const promise = fetch(dbURL.site + "/api/item").then((response) => { // fetch data as promise from api
            return response.json().then((data) => {
                res.render('../views/items.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
        
});

itemRouter.get('/add', function (req, res) {  // get request to root path
    res.sendFile(path.join(__dirname,'../../public/html/addItem.html'));
});

module.exports = itemRouter;