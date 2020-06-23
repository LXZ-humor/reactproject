let express = require("express")
let multiparty = require("multiparty")
let Goods = require("../../public/DB/goodsSchema")
let fs = require("fs");
const { count } = require("console");
let router = express.Router();
router.post("/uploading/img",(req,res)=>{
    let form = new multiparty.Form();
    form.uploadDir = __dirname+"/images"
    
    form.parse(req,function(err, fields, files){
      let name = files.image[0].originalFilename;
      let url = files.image[0].path;
      let uploadingName = url.substr(url.lastIndexOf("\\")+1);
       url = "http://localhost:8080/images/"+uploadingName
       if(!err){
           let status = 0;
           let data = {
               name,url
           }
           res.json({
                status,
                data
           })
       }else{
           let status = 1
           let data ={
               mes:"上传失败"
           }
           res.json({
                status,
                data
           })
       }
    })
})
// 删除图片
router.post("/uploading/delect",(req,res)=>{
    let name = req.body.name
    let url =  __dirname+"/images"
    fs.readdirSync(url).map(file => {
       if(file === name){
           fs.unlink(`${url}/${name}`,err=>{
               if(err){
                   res.json({status:1})
               }else{
                res.json({status:0})
               }
           })

       }
    })
})
//添加商品
router.post("/uploading/add",(req,res)=>{
    let {name, desc, price, categoryId, imgs, detail} =  req.body
    imgs = imgs.split(",")
    let data = {
        name, desc, price, categoryId, imgs, detail
    }
    let goods = new Goods(data)
    goods.save((err,resdata)=>{
        if(!err){
            res.json({status:0,mes:"添加成功"})
        }else{
            res.json({status:1,mes:"添加失败"})
        }
    })
    
})
// 获取所有商品
router.post("/getList",(req,res)=>{

    Goods.find({}).then(resdata =>{
        res.json({status:0,resdata})
    }).catch(err =>{res.json({status:1})})
})
// 修改状态
router.post("/setstatus",(req,res)=>{
    let {_id,status}= req.body
    console.log(req.body.status)
   if(status == 1){
    
       Goods.update({_id},{$set:{status:0}}).then(data =>{
           res.json({status:0})
       })
   }else if(status == 0){
    
       Goods.update({_id},{$set:{status:1}}).then(data =>{
        res.json({status:0})
    })
   }
})
module.exports = router;