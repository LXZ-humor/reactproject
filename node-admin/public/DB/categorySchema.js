var Mongoose = require("./db")
var categorySchema = Mongoose.Schema({
    categoryName:{
        type:String,
        require:true
    }
})
module.exports = Mongoose.model("category",categorySchema);