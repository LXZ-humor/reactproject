let mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/user",{ useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on("connected",()=>{
    console.log("连接成功，开始监听27017端口")
})
mongoose.connection.on("error",error =>{
    console.log(`连接失败${error}`)
})
mongoose.connection.on("disconnected",()=>{
    console.log("断开连接");
})
module.exports = mongoose;