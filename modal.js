const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketSchema = new Schema({
    item: String,
    id: String,
    qty: String,
}, { timestamps: true });

const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;