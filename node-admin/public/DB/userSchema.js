let Mongoose = require("./db")
let userSchema = Mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String
    }
})
module.exports = Mongoose.model("user",userSchema);