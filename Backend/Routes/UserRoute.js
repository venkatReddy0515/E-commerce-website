const express=require("express");
const userSchema=require("../Model/UserSchema");
const bcrypt=require("bcryptjs");
const router=express.Router();
const {generateToken}=require("./GenerateJwt");
const User = require("../Model/UserSchema");
const sendMail=require("./ForgetPassword");
router.post("/login",async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    console.log(email,password)
    try{
        const findEmail=await User.findOne({email});
        console.log(findEmail,"mail");
        if(!findEmail){
            return res.status(404).json({message:"email is not exist please Sign up"});
        }
        const comparePassword=await bcrypt.compare(password,findEmail.password);
        if(comparePassword){
        const token=generateToken(findEmail._id,findEmail.username);
        console.log(token)
        return  res.status(200).json({message:"successfully Login the user",token:token});
        }
        return res.status(400).json({message:"the password is Wrong please enter the right password"});
    }
    catch(error){
        console.log(error);
        return res.status(404).json({message:"error occured"});
    }
})

router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body;
    console.log(username,email,password)
    try{
        const findEmail=await userSchema.findOne({email});
        if(findEmail){
            return res.status(204).json({message:"email already exist please login"});
        }
        const newUser=new userSchema({username,email,password});
        console.log(newUser);
        await newUser.save();
        const token=generateToken(newUser._id,username);
        console.log(newUser);
        return res.status(200).json({message:"registered successfully",token:token});
    }
    catch(error){
        console.log(error);
        return res.status(404).json({message:"error occured"});
    }
})

router.post("/admin",async(req,res)=>{
    const{email,password}=req.body;
    try{
        
        if(email===process.env.ADMIN_EMAIL){
            console.log(email,password)
            if(password===process.env.ADMIN_PASSWORD){
            const token=generateToken(email,password);
                return res.status(200).json({message:"Successfully login",token:token});
            }
        }
        else{
            return res.status(400).json({message:"email or password will be wrong please enter the correct one"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(404).json({message:"error occured"});
    }
})
router.post("/forget",async(req,res)=>{
    const {email}=req.body;
    console.log(email);
    try{
        const findUser=await UserSchema.findOne({email});
        if(!findUser){
            return res.status(400).json({message:"Email not found"});
        }
        const otp=Math.floor(100000 + Math.random() * 900000).toString();
        findUser.otp=otp;
        console.log(otp);
        findUser.expire=Date.now()+5*60*1000;
        await findUser.save();
        sendMail(email,"Welcome to Mernmarket website thanks for come to see my work ",`the otp is ${otp}`);
        return res.status(200).json({message:"otp is send"});
    }

    catch(error){
        console.log(error);
    }
})
router.post("/reset",async(req,res)=>{
    const {email,password,otp}=req.body;
    try{
        const find=await UserSchema.findOne({email});
        if(!find){
            return res.status(400).json({message:"email not found"});
        }
        if(find.otp!==otp){
            return res.status(400).json({message:"Invalid OTP. Please try again."});
        }
        if(find.expire < Date.now()){
            return res.status(400).json({message:"OTP has expired. Please request a new one."});
        }
        find.password=password;
        find.otp=''
        find.expire=''
        await find.save();
        return res.status(200).json({message:"password change please login"})
    }
    catch(error){
        return res.status(400).json({message:"error occured."});
    }
})

module.exports=router;
