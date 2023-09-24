const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
})

module.exports = mongoose.model('Product', productSchema)