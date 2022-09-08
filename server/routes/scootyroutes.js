import express from 'express';
import { getallscootys, getsinglescooty, seedrouter } from '../controllers/scootycontroller.js';
const scootyrouter=express.Router();

scootyrouter.get("/getall",getallscootys)
scootyrouter.get("/",seedrouter)
scootyrouter.get("/scooty/:id",getsinglescooty)


export default scootyrouter;