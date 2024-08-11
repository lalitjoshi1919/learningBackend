const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index")
});


app.post("/create",  (req, res) => {
  let { userName, email,password, currentAge } = req.body;

  

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let userCreated = await userModel.create({
        userName,
        email,
        password: hash,
        currentAge
      });
      let token = jwt.sign({ email: email }, "shhh");
      res.cookie("token", token);
      res.send(userCreated);
    });
  });



});



app.get("/login", (req, res) => {
  res.render("login")
});

app.post("/login", async (req, res) => {

  let user = await userModel.findOne({ email: req.body.email });
   
  if (!user) return res.send("something went wrong ");
  else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        res.send("Hello sir, You have logined ")
      }
      else {
        res.send("something went wrong ")
      }
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.render("index");
  

});



app.listen(3000, () => {
  console.log("server is working ");
  
})