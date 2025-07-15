import multer from 'multer'
import path from 'path'
import fs from 'fs'
import express from 'express';


const app = express();

// This is only needed if you're handling non-file JSON bodies elsewhere
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/images'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,{ recursive: true})
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
   
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  },
})

const upload = multer({ storage: storage })

export default upload