import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Fix here
import AuthRoutes from './routes/Auth.js';
import DbCon from './utils/db.js';
import MessageRoutes from './routes/Messages.js';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// import express from 'express'
// import dotenv from 'dotenv'
// import AuthRoutes from './routes/Auth.js'
// import DbCon from './utils/db.js'
// import MessageRoutes from './routes/Messages.js'
// // const cors = require('cors');

// dotenv.config()
// const PORT= process.env.PORT || 5000

// //db connection
// DbCon()
// const app = express()
// app.use(express.static('public'))
// app.use(express.json())



// app.use("/api/auth",AuthRoutes)
// app.use("/api/messages",MessageRoutes)

// app.listen(PORT, ()=> {
//     console.log(server is running on port ${PORT});
    
// })