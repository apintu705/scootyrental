import express from 'express';
import { getallcars, getsinglecar, seedrouter } from '../controllers/carcontroller.js';
const carrouter=express.Router();

carrouter.get("/getall",getallcars)
carrouter.get("/",seedrouter)
carrouter.get("/car/:id",getsinglecar)


export default carrouter;