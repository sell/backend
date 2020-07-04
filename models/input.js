const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    firstSearched: {
        type: Date,
        default: Date.now
      },
      lastSearched: {
        type: Date,
        default: Date.now
      },
})

module.exports = mongoose.model('item', itemSchema)