import express from 'express';
import { rentcard } from '../controllers/rentcontroller.js';

const rentrouter=express.Router();

rentrouter.post("/rentcar",rentcard)

export default rentrouter