const Item = require('../models/item');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

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

exports.createItem = (req, res, next) => {
    isAdmin = checkAdmin(req);

    // get item data from request
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.files.image;
    // create new item instance
    const item = new Item({
        name: name,
        description: description,
        price: price
    })
    // save instance to database
    if (isAdmin) {
        item
            .save()
            .then(itemSaved => {
                // upload image to server
                const filePath = path.join(__dirname, `../../public/img/${itemSaved._id}.png`)
    
                image.mv(filePath, err => {
                    if (err) return console.log(err);
                });
                
                res.status(201).json({
                    message: 'Item created successfully!',
                    item: itemSaved
                });
            })
            .catch(err => console.log('err', err));
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
}

exports.getItems = (req, res, next) => {
    // return array of exisiting items
    Item.find().then(foundItems => {
        res.json({
            message: "All items",
            items: foundItems
        })
    });
}

exports.delItem = (req, res, next) => {
    isAdmin = checkAdmin(req);

    // get name of item to remove
    const itemID = req.body.id;
    imgPath = path.join(__dirname,`../../public/img/${itemID}.png`);

    // find item by name and remove
    if (isAdmin) {
        Item.findByIdAndDelete(itemID).then(itemDeleted => {
            res.json({
                message: "Item deleted",
                item: itemDeleted
            })
            fs.rmSync(imgPath, {
                force: true,
            });
        });
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
}

exports.getIDs = (req, res, next) => { 
    Item.find().then(foundItems => {
        res.json({
            message: "All items",
            items: foundItems.map(item => item._id)
        })
    });
}

exports.getItemByID = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isValidId) {
        return res.status(404).send({ message: "Item not found" }) // check if id is valid
    } else {
        Item.findById(req.params.id).then(foundItem => {
            res.json({
                message: "Item found",
                item: foundItem
            })
        });
    }
}