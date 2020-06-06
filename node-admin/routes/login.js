var express = require('express');
var router = express.Router();
var User = require("../public/DB/userSchema")
router.post("/",(req,res)=>{
   // let name = req.body.username;
   // let pwd = req.body.password;
   // console.log(name)
   let data ={
      username:"lisi",
      password:"123456"
   }
   let user = new User(data)
   user.save()

})
module.exports = router;