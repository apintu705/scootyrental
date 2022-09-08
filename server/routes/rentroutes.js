import express from 'express';
import { rentcard } from '../controllers/rentcontroller.js';

const rentrouter=express.Router();

rentrouter.post("/rentscooty",rentcard)

export default rentrouter