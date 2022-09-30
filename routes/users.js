const router=require('express').Router();
const bcrypt=require('bcrypt')

const User=require('../models/User')
const Post=require('../models/Post')


//UPDATE
router.put('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json({
                status:"success",
                data:{
                    user:updatedUser
                }
            })
        }
        catch(err){
            res.status(400).json(err);
        }
    }
    else{
        res.status(401).json("You can update only your account...")
    }
       
})


//DELETE
router.delete('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user=await User.findById(req.params.id);
            if(user){
                try{
                    await Post.deleteMany({username:user.username});
                    await User.findByIdAndDelete(req.params.id);
                    res.status(500).json("User deleted Successfully...");
                }
                catch(err){
                    res.status(404).json(err);
                }
            }
            else{
                res.status(401).json("User not found...")
            } 
        }
        catch(err){
            res.status(404).json("User not found...");
        }
    }
    else{
        res.status(401).json("You can delete only your account...")
    }   
})


//GET USER
router.get('/:id',async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(user){
            const { password, ...others }=user._doc
            res.status(200).json(others);
        }
        else{
            res.status(401).json("User not found...")
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;