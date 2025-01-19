const mongoose=require("mongoose");
const Product=require("../Model/Product");
const UserSchema=require("../Model/UserSchema");
const Cart=require("../Model/Cart");
const express=require("express");
const router=express.Router();
const {userVerify}=require("./GenerateJwt");
router.get("/",userVerify,async(req,res)=>{
    const userId=req.userId;
    try {
    
        const cartItems = await Cart.findOne({user:userId}).populate("items.product");

        if (!cartItems || cartItems.length === 0) {
            return res.status(204).json({ message: "Your cart is empty" });
        }

        return res.status(200).json({ message: "Your cart data", cartItems });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error occurred..", error: error.message });
    }
})

router.get("/total",userVerify,async(req,res)=>{
    const userId=req.userId;
    try{
        const existCart=await Cart.findOne({user:userId}).populate("items.product");
        if(!existCart){
            return res.status(400).json({message:"Cart details not found"});
        }
        return res.status(200).json({message:"cart totoal Price is", totalPrice:existCart.totalPrice})
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error occurred..", error: error.message });
    }

})

router.post("/add", userVerify, async (req, res) => {
    const userId = req.userId;
    const { productId, quantity, size, price } = req.body;

    try {
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }

        let userCart = await Cart.findOne({ user: userId }).populate("items");
        if (!userCart) {
            const newCart = new Cart({
                user: userId,
                items: [{ product: productId, quantity, size,}],
                totalPrice: product.price * quantity,
            });
            await newCart.save();
            return res.status(200).json({ message: "Product is added to cart.", cart: newCart });
        }
        console.log("user cart",userCart);

        const existingProduct = userCart.items.find((item) => item.product._id.toString() === productId);
        console.log(existingProduct);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            userCart.items.push({product:productId, quantity, size ,});
        }
        console.log(userCart);
        let totalPrice = 0;
        for (const item of userCart.items) {
            const fetchedProduct = await Product.findById(item.product._id);
            if (!fetchedProduct) {
                console.error(`Product not found for item:`, item);
                continue;
            }
            totalPrice += fetchedProduct.price * item.quantity;
        }
        userCart.totalPrice = totalPrice;



        await userCart.save();

        return res.status(200).json({
            message: "Product added to cart.",
            cart: userCart,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "An error occurred while processing your request." });
    }
});

router.post("/delete",userVerify,async (req,res)=>{
    const userId=req.userId;
    const {productId}=req.body;
    console.log(productId)
    try{
        const existUser=await Cart.findOne({user:userId}).populate("items.product");
        if(!existUser){
            return res.status(400).json({message:"user not found"});
        }
        console.log(existUser);

        const findProduct=await existUser.items.findIndex((item)=>item._id.toString()===productId);
        if(findProduct===-1){
            return res.status(400).json({message:"product is not found"});
        }
        const productToDelete=existUser.items[findProduct];
        existUser.totalPrice -= productToDelete.quantity * productToDelete.product.price;
        if(existUser.totalPrice<0){
            existUser.totalPrice=0;
        }
        existUser.items.splice(findProduct,1);
        await existUser.save();
        return res.status(200).json({ message: "Product removed successfully", product: productToDelete });
    }
    catch(error){
        console.log(error);
    }
})

module.exports=router;