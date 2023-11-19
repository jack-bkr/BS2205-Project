const express = require('express');
const indexRouter = express.Router();
const dbURL = require('../../dbURL.json');

indexRouter.get('', function (req, res) {  // get request to root path
    try {
        const promise = fetch(dbURL.site + "/api/item").then((response) => { // fetch data as promise from api
            return response.json().then((data) => {
                res.render('../views/index.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
        
});

module.exports = indexRouter;