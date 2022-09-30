const mongoose=require('mongoose')
const validator=require('validator')


const useSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,"Please enter your email"],
        validator:[validator.isEmail,'Please provide valid email']
    },
    password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    profilePic:{
        type:String,
        default:""
    },
},
{timestamps:true})


module.exports=mongoose.model("User",useSchema);