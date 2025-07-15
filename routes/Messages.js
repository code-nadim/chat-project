import express from "express";
import { CreateMessage, Getmessage } from "../controllers/Messgess.js";

const MessageRoutes = express.Router()

MessageRoutes.post("/create-message" ,CreateMessage)
MessageRoutes.post("/get-message", Getmessage)

export default MessageRoutes