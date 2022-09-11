const User= require("../models/userDb")
const cryptoJs=require("crypto-js")
const jsonwebToken=require("jsonwebtoken")

exports.register=async(req,res)=>{
    const {password}= req.body.password;
    try {
        req.body.password=cryptoJs.AES.encrypt(password,process.env.PASSWORD_SECRET_KEY)
        const user=await User.create(req.body)
        const token= jsonwebToken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"24h"}
        )
        res.status(201).json({message:"User created",user:user})
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.login=async(req,res)=>{
    const {username,password}=req.body
    try {
        const user=await User.findOne({username}).select('password')
        if(!user){
            res.status(401).json({
                error:"Invalid Username/password"
            })
        }
        const decryptPass= cryptoJs.AES.decrypt(
            user.password,process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8) 
        if(password!=decryptPass){
            res.status(401).json({
                error:"Invalid Username/password"
            })
        }

        const token=jsonwebToken.sign(
            {user:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"24h"}
        )
        res.status(200).json({
            data:[user.username,user._id],
            token
        })

    } catch (error) {
        res.status(401).json(error)
    }
}
