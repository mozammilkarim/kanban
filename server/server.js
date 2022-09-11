const express=require("express")
const mongoose=require("mongoose")
const authRouter=require("./routes/auth")
const app=express()
require("dotenv").config()
app.use(express.json())

mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongodb connected!")
}).catch((err=>{
    console.log("error",err)
}))

app.use("/v1/api/",authRouter)
app.get("/",(req,res)=>{
    res.send("You are a Man!")
})
const PORT=process.env.PORT|| 3001
app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`)
})