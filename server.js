const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

//middleware
const app = express();
app.use(express.json());
app.use(cors());

//plugins
port=5003;
mongo_url='mongodb://localhost:27017/dbpallotti';

//connecting Local DB
mongoose.connect(mongo_url).then(() =>{
    console.log('DB Connected Properly');})
    .catch((err) => {
        console.log('Error in DB Connection:', err);
    });


// Create Schema - collection
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   }, 
   {timestamps:true}
);
const User = mongoose.model('User', userSchema);

//Insert a record - Posting the record
app.post("/createuser", async (req,res) => {
    try{
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});


//retriveAll a reacord - getting the All record
app.get("/getusers", async (req,res) =>{
    try{
        const userData= await User.find({});
        res.send(userData);
    }catch(error){
        res.send(error);
    }
})


//retrive perticular user - getting perticular user by ID
app.get("/getuser/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById({_id:id});
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});


// update user 
app.put("/update/:id", async (req, res) => {
    try{
        const id=req.params.id;
        const userData=await User.findByIdAndUpdate({_id:id}, req.body,{
            new:true,
        });
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});


//delete user
app.delete("/delete/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const userData=await User.findByIdAndDelete({_id:id})
        res.send(userData);
    }catch(error){res.send(error);}
});


app.get("/" , (req, res)=>{
    res.send("Welcome on Browser");
});

app.listen(port , ()=>{
    console.log(`Server is running http://localhost:${port}/`);
})