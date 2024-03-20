const mongoose = require('mongoose');
const Products = new mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    desc: String,
    isNewArrival: Boolean,
    review: String,
    category: String,
    isTopSeller: Boolean,
    bigDesc: String
});

const ProductModel = mongoose.model("products", Products);
module.exports = ProductModel;

