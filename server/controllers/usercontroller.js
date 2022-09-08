import {User} from "../models/usermodel.js"
import  bcrypt from'bcryptjs';


export const userlogin=async(req, res, next) => {
    
    const user=await User.findOne({username:req.body.username});
    try{
        if(user){
            const isvalid=bcrypt.compareSync(req.body.password, user.password);
            
            if(isvalid){
                return res.status(200).send(user)
            }else{
                return res.status(400).send({message:"entered wrong password"})
            }
        }else{
            return res.status(400).send({message:"User Not found"});
        }
    }
    catch(err){
        return res.status(400).send(err.message)
    }
    
        
}

export const userregister=async(req, res, next) => {
    const user=await User.findOne({username:req.body.username});
    try{
        if(user){
            return res.status(400).send({message:"User already exists"});
            
        }else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            await User.create(req.body);
            return res.status(200).send("User Registration successfull")
        }
    }
    catch(err){
        return res.status(400).send(err.message)
    }
    
        
}