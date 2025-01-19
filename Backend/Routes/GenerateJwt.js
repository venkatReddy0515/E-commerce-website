const jwt=require("jsonwebtoken");

const generateToken=(id,username)=>{
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}

const verifyToken=(req,res,next)=>{
    try{
        const {token}=req.header("Authorization");
        if(!token){
            res.status(400).json({message:"please login to generate the token"});
            
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(decoded!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                res.status(400).json({message:"not authorized please login"});
            }
        next();
        
    }
    catch(error){
        next(error);
    }
}

const userVerify=(req,res,next)=>{
    const N=req.header("authorization");
    if(!N){
        res.status(400).json({message:"Please login to generate token"});
    }
    const  token=N.split(" ")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(error){
        next(error);
    }
}

module.exports={generateToken,verifyToken,userVerify};