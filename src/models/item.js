const mongoose = require('mongoose');
// get schema from mongoose object
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('item', itemSchema);