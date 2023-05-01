const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    price:{
        type: String
    },
    countInStock:{
        type: Number
    },
    brand:{
        type: String
    },
    rating:{
        type: Number
    },
    numReviews:{
        type: Number
    },
    description:{
        type: String
    },
}, {timestamps: true})


module.exports = mongoose.model('Product', productSchema)