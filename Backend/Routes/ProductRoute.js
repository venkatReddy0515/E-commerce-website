const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const {verifyToken}=require("./GenerateJwt")
const Product=require("../Model/Product")

router.post("/add-product",async (req, res) => {
    const {
        name,
        image,
        subimages,
        price,
        category,
        subcategory,
        description,
        rating,
        info,
        bestseller,
    } = req.body;

    try {
        if (!name || !image || !price || !category || !subcategory || !description || !info) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        
        const newProduct = new Product({
            name,
            image,
            subimages,
            price,
            category,
            subcategory,
            description,
            rating: rating || 1,
            info,
            bestseller: bestseller || false
        });

        
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/remove/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const exist=await Product.findByIdAndDelete(id);
        
        if(!exist){
            return res.status(400).json({message:"The product is not found"});
        }
        return res.status(200).json({message:"the producted deleted successfully"});
    }
    catch(error){
        return res.status(404).json({message:"erros is occured",error:error});
    }
});
router.get("/",async(req,res)=>{
    try{
        const products=await Product.find();
            return res.status(200).json({message:"products are devlivered",product:products});
    }
    catch{
        console.log(error);
        return res.status(400).json({message:"error",error:error});
    }
})

module.exports=router;