const express = require("express")
const path = require("path")
const fs=require("fs")

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  fs.readdir("./files",function(err,files){
    
    res.render('index.ejs',{files:files})
  })
});
app.post('/create', (req, res) => {
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details ,function(err){

     res.redirect('/')
   })

});
app.get('/file/:filename',(req,res) => {
  fs.readFile(`files/${req.params.filename}`,"utf-8",function(err,fileData){
    
    res.render('read.ejs',{filename : req.params.filename ,fileData : fileData})
  })
})



app.listen(3000, () => {
  console.log("server is working");
});