let express = require("express")
let multiparty = require("multiparty")
let fs = require("fs")
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
module.exports = router;