var express = require("express");
var router = express.Router();
var Category = require("../../public/DB/categorySchema")
router.post("/",(req,res)=>{
        let categoryName=req.body.categoryName
       
       Category.find({categoryName}).then(resdata =>{
               if(resdata){
                      let category = new Category({categoryName})
                      category.save();
               }
       })
       
})
module.exports = router