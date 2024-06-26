const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true
    },
    price:{
        type:Number,
        require:true,
        min: 0
    },
    year:{
        type:Number,
        require:true,
        min: 1990,
    },
    brand:{
        type:String,
        require:true,
        trim: true     
    },
    details:{
        type:String,
        require:true,
        trim: true 
    },
    imgURL:{
        type:String,
        require:true,
        validate: {
            validator: function(v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }   
    },
    description:{
        type:String,
        require:true ,
        trim: true
    }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;