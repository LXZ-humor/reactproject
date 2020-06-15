var Mongoose = require("./db")
var categorySchema = Mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    parentId:{
        type:String,
        default:"0"
    }
})
module.exports = Mongoose.model("category",categorySchema);