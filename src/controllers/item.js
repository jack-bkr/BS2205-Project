const Item = require('../models/item');

exports.createItem = (req, res, next) => {
    // get item data from request
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
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