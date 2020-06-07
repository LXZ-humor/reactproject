var express = require('express');
var router = express.Router();
var User = require("../public/DB/userSchema")
router.post("/",(req,res)=>{
   let name = req.body.username;
   let pwd = req.body.password;
   let loginData={
      username:name,
      password:pwd

   }
   User.findOne( loginData, {username: 1, password: 1}, (err, result) => {
      if (err) {
          console.log(err)
      } else {
          if (result) {
              res.json({ status: 0, result })
              return
          } else {
              // 如果没有找到该用户则自动添加一个新用户
              res.json({ status: 1, mes: '用户名或密码不正确!'})
              return
          }
      }
   })

})
module.exports = router;