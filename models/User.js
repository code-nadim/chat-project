
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
name:{
    type : String,
    required:true,
    
},
email:{
    type : String,
    required:true,
    unique:true
},
password:{
    type : String,
    required:true,
   
},
profile:{
    type:String,
    default:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
},

},{timestamps:true})


const UserModel = mongoose.model("User",UserSchema)
export default UserModel