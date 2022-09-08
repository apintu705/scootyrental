import express from 'express';
import { userlogin, userregister } from '../controllers/usercontroller.js';

const userrouter=express.Router();

userrouter.post("/login",userlogin);
userrouter.post("/register",userregister);


export default userrouter;