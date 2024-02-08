const strict = require("assert/strict");
const mongoose = require("mongoose");



 mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");


 const productSchema=new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDesc: String,
    productImg: String
})
 const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    gender: String,
    dob: String,
    password: String
})



module.exports = {products: mongoose.model("products", productSchema), users:mongoose.model("users", userSchema) }