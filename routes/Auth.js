import express from "express";
import { GetUsers, Login, Register } from "../controllers/AuthController.js";
import upload from "../middelware/Multrer.js";


const AuthRoutes = express.Router()
AuthRoutes.post('/register',upload.single('profile'),Register)
AuthRoutes.post('/login',Login)
AuthRoutes.get('/getUser',GetUsers)



export default AuthRoutes