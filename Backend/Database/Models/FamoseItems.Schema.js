import mongoose from "mongoose"

const FamouseItemsSchema = new mongoose.Schema({
    famouseProduct:{
        type:String,
    },
}, {
    timestaps:true,
})


const famouseProduct = mongoose.model("famouseProduct" , FamouseItemsSchema)

export default famouseProduct