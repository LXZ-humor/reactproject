var express = require("express");
var router = express.Router();
var Category = require("../../public/DB/categorySchema")
router.post("/addCategory",(req,res)=>{
        let name=req.body.categoryName;
        let parentId = req.body.parentId;
        let category = new Category({name,parentId})
        category.save((err,resdata)=>{
               if(!err){
                res.json({mes:"添加成功",status:"1",resdata})
               }else{
                res.json({mes:"添加失败",status:"0"})
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
// 修改父级
router.post("/UpdataCate",(req,res)=>{
        let name=req.body.name;
        let _id = req.body._id;
        Category.update({_id},{$set:{name}},err=>{
                if(!err){
                        res.json({status:"1",mes:"修改成功"});
                }else{
                        res.json({status:"0",mes:"修改失败"});
                }
        })
})
// 获取所有列表
router.post("/listAll",(req,res)=>{
        Category.find({},(err,resdata)=>{
                if(!err){
                        res.json({status:"1",resdata})
                }else{
                        res.json({status:"0"}) 
                }
        })
})
// 删除
router.post("/delectCate",(req,res)=>{
        let _id = req.body._id
        Category.remove({_id},err=>{
                if(!err){
                        res.json({status:"1"})
                }
        })
       
})
module.exports = router