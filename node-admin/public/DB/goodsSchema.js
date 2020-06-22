let moogose = require("./db")
let goodsSchema = moogose.Schema({
    status: {
        type: Number,
        default:1
    },
    name: {
        type: String
    },
    categoryId: {
        type: String
    },
    desc: {
        type:String
    },
    price: {
        type: String
    },
    detail: {
        type: String
    },
    imgs: {
        type: Array
    }

})
module.exports = moogose.model("goods",goodsSchema)