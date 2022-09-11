const mongoose=require("mongoose")
const { schemaOptions } = require("./schemaOptions")

const User=new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
            min:4
        },
        password:{
            type:String,
            require:true,
            min:8
        }
    },
    schemaOptions
)
module.exports = mongoose.model("User",User)