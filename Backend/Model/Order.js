const mongoose=require("mongoose");
const Order=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,
                ref:"Product",require:true
                },
            quantity:{type:Number,require:true,default:1},
            size:{type:String,require:true},
        }
    ],
    totalPrice:{
        type:Number,require:true
    },
    status:{
        type:String,
        enum:["Pending","Processing","Shipped","Delivered"],
        require:true
    },
    phone:{type:String,require:true},
    street:{type:String,require:true},
    city:{type:String,require:true},
    district:{type:String,require:true},
    pincode:{type:String,require:true},
    payment:{type:String,enum:["COD","UPI","Credit Card"],require:true},
    paymentStatus:{type:String,enum:["Pending","Failed","Conformed"]},

},{Timestamps:true})

module.exports=mongoose.model("Order",Order);