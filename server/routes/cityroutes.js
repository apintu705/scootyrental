import express from 'express';
import { cityes, seedroutercity } from '../controllers/citycontroller.js';

const cityrouter=express.Router();

cityrouter.get("/city",cityes)
cityrouter.get("/",seedroutercity)


export default cityrouter