const mongoose=require("mongoose");
const Product=require("../Model/Product");
const User=require("../Model/UserSchema");
const Cart=require("../Model/Cart");
const Order=require("../Model/Order");
const express=require("express");
const {userVerify}=require("./GenerateJwt");
const router=express.Router();

router.post("/order",userVerify,async(req,res)=>{
    const userId=req.userId;
    const {phone,street,city,district,pincode,payment}=req.body;
    
    try{
        const findCart=await Cart.findOne({user:userId});
        if(!findCart || findCart.items.length===0){
            return res.status(400).json({message:"cart not found"});
        }
        
        const order=await Order.findOne({user:userId});
        if(!order){
            const newOrder=new Order({user:userId,items:findCart.items,totalPrice:findCart.totalPrice+0.5,status:"Pending",phone:phone,street:street,city:city,district:district,pincode:pincode,payment:payment,paymentStatus:"Pending"})
            await newOrder.save();
            console.log(newOrder);
            findCart.items=[];
            findCart.totalPrice=0;

            await findCart.save();
            console.log(findCart,"after edit");
            return res.status(200).json({message:"order isp placed"});
        }
        order.items.push(...findCart.items);
        order.totalPrice+=findCart.totalPrice;
        console.log(order);
        await order.save();
        findCart.items=[];
        findCart.totalPrice=0;

        await findCart.save();
        console.log(findCart,"after edit");
        return res.status(200).json({message:"order is placed"});

    }
    catch(error){
        return res.status(400).json({message:error});
    }
})

router.get("/order-details",userVerify,async(req,res)=>{
    const userId=req.userId;
    try{
        const OrderProducts=await Order.find({user:userId}).populate("items.product");
        console.log(OrderProducts);

        return res.status(200).json({message:"orders",OrderProducts});
    }
    catch(error){
        return res.status(400).json({message:"error"})
        console.log(error)
    }
})

router.get("/order-list",async(req,res)=>{
    try{
        const list=await Order.find().populate("user");
        if(!list){
            return res.status(400).json({message:"not order is there"});
        }
        return res.status(200).json({message:"orders are",order:list});
    }
    catch(error){
        console.log(error);
    }
})

router.post("/status",async(req,res)=>{
    const {status,id}=req.body;
    console.log(status,id);
    try{
        const orderId=await Order.findByIdAndUpdate(id,{status},{new:true});
        console.log(orderId);
    }
    catch(error){
        console.log(error);
    }
})

module.exports=router;