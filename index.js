import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Fix here
import AuthRoutes from './routes/Auth.js';
import DbCon from './utils/db.js';
import MessageRoutes from './routes/Messages.js';
import { Server } from 'socket.io';
import { createServer } from 'http'

dotenv.config();
const PORT = process.env.PORT || 5000;

// DB connection
DbCon();

const app = express();

// ✅ CORS setup (MUST be before routes)
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}));

app.use(express.static('public'));
app.use(express.json());

// API routes
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

// socketiio connection 
const server = createServer (app)
const io =new Server (server,{
  cors:{
    origin: 'http://localhost:5173', // or your deployed frontend domain
credentials: true
, // Update with your frontend domain for production
    methods : ['GET', 'POST'],
  }
})

       let users =[]
      const Addusers= (userId,socketId) => {
        !users.some((user)=>user.userId===userId)&&
        users.push({userId,socketId})
      }
      
      const RemoveUser=(socketId)=>{
        users=users.filter((user)=>user.socketId!==socketId)
      }
      
      
      io.on("connection",(socket)=>{
        console.log(" a user connected");
        socket.on("AddUserSocket",(userId)=>{
          Addusers(userId,socket.id)
          io.emit("getUser", users)
          console.log('users',users);
        })

       const GetUser = (userId)=>{
        return users.find((user)=>user.userId===userId)


       }
       socket.on("sendMessage",(data)=>{
         const { senderId, reciverId , message} =  data.messageData
         console.log('data' , data.messageData);
         
        const user = GetUser(reciverId)
        if (user?.socketId) {
          io.to(user.socketId).emit('reciverMessage', {
            userId:senderId,
            message,
          })
        } else {
          console.log('Receiver not connected');
          
        }
       })



  socket.on("disconnect",()=>{
    RemoveUser(socket.id)
    io.emit("getUsers", users)
    console.log("user disconnected");
    
  })
  
})



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




