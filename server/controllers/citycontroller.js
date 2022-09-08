import data from "../data.js";
import {City} from "../models/typemodel.js"

export const cityes=async(req, res, next) => {
    const city=await City.find();
    res.send(city)
}

export const seedroutercity=async(req, res, next)=>{
    await City.remove();
    const createcity=await City.insertMany(data.category);
    res.send({createcity})
}
