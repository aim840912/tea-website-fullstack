const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bulletinSchema = new Schema({
    main: { type: Boolean,  },
    title: { type: String,  },
    image: { type: String,  },
    description: { type: String, },
    url: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Bulletin', bulletinSchema)