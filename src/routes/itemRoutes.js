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

itemRouter.get('/:id', function (req, res) {
    try {
        const promise = fetch(dbURL.site + "/api/item/" + req.params.id).then((response) => {
            if (response.status === 404) {
                res.status(404).send({ message: "Item not found" });
            }
            return response.json().then((data) => {
                res.render('../views/viewItem.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = itemRouter;