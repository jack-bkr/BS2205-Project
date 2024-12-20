const express = require('express');
const itemRouter = express.Router();
const path = require('path');

const dbURL = require('../../dbURL.json');

async function checkUser(req) {
    if (!req.headers.cookie) {
        return false;
    }
    cookies = req.headers.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].includes('user')) {
            userID = cookies[i].split('=')[1];
        }
    }

    userURL = dbURL.site + "/api/user/" + userID;
    const promise = await fetch(userURL);
    const response = await promise.json();
    return await [response.username, response.admin];
}

itemRouter.get('', async function (req, res) {  // get request to root path
    user = await checkUser(req);
    
    try {
        const promise = fetch(dbURL.site + "/api/item").then((response) => { // fetch data as promise from api
            return response.json().then((data) => {
                data.User = user;
                res.render('../views/items.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
        
});

itemRouter.get('/add', async function (req, res) {  // get request to root path
    user = await checkUser(req);

    if (user[1] == true) {
        res.sendFile(path.join(__dirname, '../../public/html/addItem.html'));
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
});

itemRouter.get('/:id', async function (req, res) {
    user = await checkUser(req);
    try {
        const promise = fetch(dbURL.site + "/api/item/" + req.params.id).then((response) => {
            if (response.status === 404) {
                res.status(404).send({ message: "Item not found" });
            }
            return response.json().then((data) => {
                data.User = user;
                res.render('../views/viewItem.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = itemRouter;