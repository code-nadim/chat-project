import mongoose from "mongoose";

const Converstaionscema= new mongoose.Schema({
    members:[
       {
         type:mongoose.Schema.Types.ObjectId,
         ref: "User",
         required:true
        }
    ],

    messages : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        required: true
    }],
},{
    timestames:true

})

const  ConverstaionModal = mongoose.model("Conversation",Converstaionscema)

export default ConverstaionModal