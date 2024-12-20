const User = require('../models/user');
const mongoose = require('mongoose');

async function checkAdmin(req) {
    if (!req.headers.cookie) {
        return false;
    }
    cookies = req.headers.cookie.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].includes('user')) {
            user = cookies[i].split('=')[1];
        }
    }

    user = await User.findById(user).exec()
    isAdmin = user.admin;

    return isAdmin
}

async function checkForExistingUser(req) {
    username = req.body.username;
    exists = false;

    await User.find().then(foundUsers => {
        for (let i = 0; i < foundUsers.length; i++) {
            if (foundUsers[i].username == username) {
                exists = true;
            }
        }
    })

    return exists;
}


exports.createUser = async (req, res, next) => {
    // get data from request

    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin;

    // create new user instance

    const user = new User({
        username: username,
        password: password,
        admin: admin,
    })
    // Check if username already exists
    userExists = await checkForExistingUser(req);
    // Check if user is admin
    isAdmin = await checkAdmin(req);
    
    // save instance to database
    if (isAdmin == true && userExists == false) {
        user
            .save()
            .then(userSaved => {
                res.status(201).json({
                    message: 'User created',
                    user: userSaved
                })
            })
            .catch(err => console.log('err', err));
    } else if (isAdmin == false){
        res.status(403).json({
            message: 'Forbidden'
        })
    } else {
        res.status(409).json({
            message: 'User already exists'
        })
    }
}

exports.login = async (req, res, next) => {
    username = req.body.username;
    password = req.body.password;

    await User.find().then(foundUsers => {
        for (let i = 0; i < foundUsers.length; i++) {
            if (foundUsers[i].username == username && foundUsers[i].password == password) {
                res.cookie('user', foundUsers[i].id);
                res.redirect("/");
                return;
            }
        }
        res.status(404).json({
            message: 'Username/password incorrect'
        })
    })

}

exports.getUser = async (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isValidId) {
        return res.status(404).send({ message: "Item not found" }) // check if id is valid
    } else {
        await User.findById(userID).then(foundUsers => {
            res.status(200).json({
                username: foundUsers.username,
                admin: foundUsers.admin
            })
        })
    }
}