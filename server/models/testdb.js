const mongoose = require('mongoose')

const Schema = mongoose.Schema

const testdbSchema = new Schema({
    title: String,
    image: String
}, { timestamps: true })



module.exports = mongoose.model('Testdb', testdbSchema)