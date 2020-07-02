let express = require("express")
let router = express.Router()
let User = require("../../public/DB/userSchema")
const { query } = require("express")
router.post("/getuser",(req,res)=>{
    User.find({}).then(resdata =>{
        res.json({status:0,resdata})
    }).catch(err =>{
        res.json({status:1})
    })
})
router.post("/upuser",(req,res)=>{
    let {username,_id} = req.body
    User.update({_id},{$set:{username}}).then(resdata =>{
        res.json({status:0})
    }).catch(err =>{
        res.json({status:1})
    })
})
// 删除用户
router.post("/delUser",(req,res)=>{
    let {_id} = req.body
    User.remove({_id},(err,resdata)=>{
        if(!err){
            res.json({status:0,mes:"删除成功"})
        }else{
            res.json({status:1,mes:"删除失败"})
        }
    })
})
// 获取一个用户信息
router.get("/reqGetUser",(req,res)=>{
    let {username}=req.query
    User.find({username}).then(resdata=>{
      res.json({status:0,resdata})
       
    }).catch(err=>{
        res.json({status:2})
    })
})
module.exports = router