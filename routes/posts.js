const router=require('express').Router();

const User=require('../models/User')
const Post=require('../models/Post')


//CREATE POST
router.post('/',async (req,res)=>{
       const newPost= new Post(req.body);
       try{
        await newPost.save();
        res.status(200).json({
            status:"success",
            data:{
                post:newPost
            }
        });
       }
       catch(err){
        res.status(500).json(err);
       }
});


router.put('/:id',async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },
                {new :true});
                res.status(200).json({
                    status:"success",
                    data:{
                        post:updatedPost
                    }
                })
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can update only your post...");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})


//DELETE POST
router.delete('/:id', async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            res.status(400).json("Not any post with this id...")
            return;
        }
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json("Post has been deleted...")
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can delete only your post...")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})


//GET POST
router.get('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(401).json("Post not found...")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET ALL POSTS
router.get('/', async(req,res)=>{
    const username=req.query.user;
    const catname=req.query.cat;

    try{
        let post;
        if(username){
            posts=await Post.find({username});
        }
        else if(catname){
            posts=await Post.find({
                categories:{
                    $in:[catname]
                }
            })
        }
        else{
            posts=await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;