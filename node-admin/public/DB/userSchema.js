let Mongoose = require("./db")
let bcrypt = require('bcrypt');
let saltRounds =10;
let userSchema = Mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String
    }
})
userSchema.pre("save",function(next){
    let that = this;
    if(!that.isModified("password")){
        return next();
    }
    bcrypt.genSalt(saltRounds,function(err, salt){
        bcrypt.hash(that.password,salt,function(err, hash){
            if(err){
                return next(err)
            }
            that.password = hash;
            next()
        })
    })
  
  })
module.exports = Mongoose.model("user",userSchema);