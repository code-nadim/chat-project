import mongoose from "mongoose";

const DbCon = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected");
        
    } catch (error) {
        console.log('Error in DB connection');
        
    }
}

export default DbCon