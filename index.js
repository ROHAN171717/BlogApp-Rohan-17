const express=require('express');
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const multer=require('multer');


const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const catRoute=require('./routes/categories')

//---DB connection
dotenv.config();

const DB=process.env.DB_URL;
mongoose.connect(DB).then(() => {
    console.log('DB CONNECTION SUCCESSFULL');
}).catch(err => console.log(err))


const app=express();
app.use(express.json());


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded...")
})



app.get('/',(req,res)=>{
    console.log('hello');
    res.status(200).send('<h1>hello</h1>')
})

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/cat',catRoute)


app.listen(4000,()=>{
    console.log('App is running...');
    
})
