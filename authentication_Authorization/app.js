const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "lalit")     //how to set cookie
  res.send("hey")
});

app.get("/read", (req, res) => {
  console.log(req.cookies);            // we can read in any route b/c server send res and 
  res.send("readMore")          

})

app.get("/encrypt", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("password", salt, function (err, hash) {      // how we use encryption
      console.log(hash);
    });
  });
});

app.get("/decrypt", (req, res) => {
  bcrypt.compare("password", "$2b$10$6/8o3eSHD./3SXG1s5Plm.6supITa2/7qM0eyhMyfpDBwAzS2MyJ.", function(err, result) {
    console.log(result);                                         //how we use decryption
});
});

app.get("/jwt", (req, res) => {
  var token = jwt.sign({ email: "lalitjoshi1919@gmail.com" }, 'shhhhh'); //this is the to set jwt
  res.cookie("token", token);
  res.send("hey, This side lalit is speaking");
})




app.listen(3000, () => {
  console.log("server is working");
    
});