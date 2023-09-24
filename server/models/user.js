const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    twitchId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["k7", "audience"],
        default: "audience"
    },
    email: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('User', userSchema)