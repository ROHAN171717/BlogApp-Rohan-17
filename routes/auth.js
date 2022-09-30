const router=require('express').Router();
const bcrypt=require('bcrypt')

const User=require('../models/User')


//REGISTER
router.post('/register',async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email OR username already Exist!" });

        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password,salt);
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })

        await newUser.save();

        res.status(200).json({
            status:"success",
            data:{
                user:newUser
            }
        })
    }
    catch(err){
        res.status(400).json(err);
    }   
})


//LOGIN
router.post('/login',async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user){
            res.status(400).json("Wrong credentials...");
            return;
        }

        const validated=await bcrypt.compare(req.body.password,user.password)
        if(!validated){
            res.status(400).json("Wrong credentials...");
            return;
        }

        const { password,...others }=user._doc;

        res.status(200).json({
            status:"success",
            data:{
                user:others
            }
        })
    }
    catch(err){
        res.status(500).json(err);
    }   
})


module.exports=router;