import { connections } from "mongoose"
import ConverstaionModal from "../models/Converstaion.js"
import MessageModel from "../models/Message.js"

export const CreateMessage= async(req,res) =>{
    try {
        const {senderId, reciverId, message} = req.body
        if (!senderId || !reciverId || !message) {
            return res.status(400).json({
                success:false, message: `${!senderId ? "Sender Id" : !reciverId ? "Reciver Id" : "Message"} is  required.`,
            })
        }
   
        const newMessage = new MessageModel({
            userId:senderId,
            message
        })

        const savemessage = await newMessage.save()

        let conversation = await ConverstaionModal.findOne({
            members:{
                $all:[senderId,reciverId],
                $size: 2
            }
        })

        if (conversation) {
            conversation = await ConverstaionModal.findByIdAndUpdate(
                conversation._id,
                {
                    $push:{
                        messages:[savemessage._id]
                    }
                },
            {new:true})
        }
        else {
            conversation = new ConverstaionModal({
                members:[senderId,reciverId],
                messages:[savemessage._id]
            })
            await conversation.save()
        }
        return res.status(200).json({
            success:true,
            message:"Message sent successfully",
            data:{
                newMessage: savemessage,
                conversation: conversation
            }
        })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            success:false,
            message:"InterNal Server error"
        })
    }
}

export const Getmessage = async(req,res) =>{
    try {
        const {senderId,reciverId}= req.body
        if (!senderId || !reciverId) {
            return res.status(400).json({
                success:false,
                message:`${!senderId? "Sender Id " : !reciverId ?"Receiver Id" : "Message"} is required.`,
            });
        }
            const converstion = await ConverstaionModal.findOne({
                 members:{
                $all:[senderId,reciverId],
                $size: 2
            }
            }).populate("messages")
            if (!converstion) {
              const newConverstion=new ConverstaionModal({
                members:[senderId,reciverId],
                messages:[]
              })
              await newConverstion.save()
              return res.status(200).json({
                success:true,
                message:"Converstion created",
                data:newConverstion
              })
            }
        return res.status(200).json({
            success:true,
            message:"Conversation found",
            data:converstion.messages 
        })
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}