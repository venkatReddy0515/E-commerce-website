const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    },
    expire:{
        type:Date
    },

},{timestamps:true})

userSchema.pre("save",async function(next){
    try{
        const salt=await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password,salt);
        console.log(this.password);
        next();
    }
    catch(error){
        next(error);
    }
    
});

module.exports=mongoose.model("User",userSchema);