const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    value: Number,
    price: Number
})

Product.pre('save', function(next){
    
    next()
})

module.exports = mongoose.model('products', Product)