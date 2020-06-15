var express = require("express");
var router = express.Router();
var Category = require("../../public/DB/categorySchema")
router.post("/addCategory",(req,res)=>{
        let name=req.body.categoryName
       Category.findOne({name}).then(data =>{
               if(!data){
                      let category = new Category({name})
                      category.save();
                      Category.findOne({name}).then(resdata =>{
                        res.json({mes:"添加成功",status:"1",resdata})
                        return
                      })
                      
                }else{
                        res.json({mes:"添加失败,分类名称已经存在",status:"0"})
                }
       })
       
})
// 获取顶级父类
router.post("/getParent",(req,res)=>{
        let {parentId} = req.body;
        Category.find({parentId},(err,data)=>{
                if(!err){
                        res.json({status:"1",data})
                }else{
                        res.json({status:"0"})
                }
        })
})
module.exports = router