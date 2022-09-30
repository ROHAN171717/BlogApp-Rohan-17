const mongoose=require('mongoose')


const postSchema= new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:[true,"Please enter a title"]
    },
    desc:{
        type:String,
        required:[true,"Please enter a decription"]
    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:[true,"Please enter a usename"]
    },
    categories:{
        type:Array,
        required:false
    },
},
{timestamps:true})


module.exports=mongoose.model("Post",postSchema);