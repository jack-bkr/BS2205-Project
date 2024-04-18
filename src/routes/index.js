const express = require('express');
const indexRouter = express.Router();
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

indexRouter.get('', async function (req, res) {  // get request to root path
    user = await checkUser(req);
    
    try {
        const promise = fetch(dbURL.site + "/api/item").then((response) => { // fetch data as promise from api
            return response.json().then((data) => {
                data.User = user;
                res.render('../views/index.ejs', data);
            });
        });
    } catch (error) {
        console.log(error);
    }
        
});

module.exports = indexRouter;