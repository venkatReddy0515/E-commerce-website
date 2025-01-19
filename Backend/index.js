const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");


const router=require("./Routes/UserRoute")
const ProductRouter=require("./Routes/ProductRoute")
const CartRouter=require("./Routes/CartRoutes");
const OrderRouter=require("./Routes/OrderRouter");
dotenv.config();

const app=express();
app.use(cors());

const port=process.env.PORT||5000;
app.use(express.json());
app.use("/api",router);
app.use("/api/product",ProductRouter);
app.use("/api/cart",CartRouter);
app.use("/api/place-order",OrderRouter);
app.get("/",(req,res)=>{
    res.send("api is buliding.");
})


app.listen(port,()=>{
    console.log("server is running on",port)
})


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected successfully");
})
.catch((error)=>{
    console.log("error",error)
    
})