import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema({
   
    productName:{
        type: String,
        required: true,
    },
    productPrice:{ 
        type: Number,
        required: true,
    },
    productOfferPrice:{
        type: Number,
    },
    productDetails:{
        type: String,
        required : true,
    },
    productOfferDetails:{
        type: String,
    },
    productRating:{
        type:Number
    },
},
{
    timestamps:true,
})


const productData = mongoose.model("prodectsData" , productDataSchema)

export default productData
