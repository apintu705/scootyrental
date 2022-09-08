import data from "../data.js";
import {Scooty} from "../models/scootymodel.js"

export const getallscootys=async(req,res,next)=>{
    const scootys=await Scooty.find();
    res.send(scootys)
}

export const seedrouter=async(req, res, next)=>{
    await Scooty.remove();
    const createscootys=await Scooty.insertMany(data.scootys);
    res.send({createscootys})
}
export const getsinglescooty=async(req, res, next)=>{
    const scooty=await Scooty.findById(req.params.id);
    res.status(200).send(scooty)
}