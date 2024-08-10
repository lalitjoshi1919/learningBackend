const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');




app.get('/',(req,res)=>{
  res.render("index")
});

app.get('/read',async (req,res)=>{

  let users = await userModel.find();
  res.render("read",{users })
  
});

app.get('/delete/:userId',async (req,res)=>{
  let users = await userModel.findOneAndDelete({_id : req.params.userId});
  res.redirect("/read")
});

app.get('/edit/:userId',async function(req,res){
  let user = await userModel.findOne({_id : req.params.userId});
  res.render("edit",{ user})
  
})






app.post('/create',async (req,res)=>{
  let {name ,email,imgUrl}= req.body;



  let createUser = await userModel.create({
    name ,
    email,
    imgUrl
  })
  res.redirect("/read");
  
})

app.post('/update/:userId',async (req,res)=>{
  let {name ,email,imgUrl}= req.body;



  let updateUser = await userModel.findOneAndUpdate({_id:req.params.userId},{name ,email,imgUrl},{new:true})
  res.redirect("/read");
  
})

app.listen(3000 , () => {
  console.log("server is working");
});