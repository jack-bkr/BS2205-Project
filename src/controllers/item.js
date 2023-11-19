const Item = require('../models/item');
const path = require('path');

exports.createItem = (req, res, next) => {
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
    // get name of item to remove
    const itemName = req.body.name;

    // find item by name and remove
    Item.deleteOne({ name: itemName }).then(itemDeleted => {
        res.json({
            message: "Item deleted",
            item: itemDeleted
        })
    });

}

exports.getIDs = (req, res, next) => { 
    Item.find().then(foundItems => {
        res.json({
            message: "All items",
            items: foundItems.map(item => item._id)
        })
    });
}