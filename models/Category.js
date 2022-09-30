const mongoose=require('mongoose')


const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Please enter a title"]
    }
},
{timestamps:true})


module.exports=mongoose.model("Category",categorySchema);