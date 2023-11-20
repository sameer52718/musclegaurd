import express from 'express'
import dotenv from "dotenv"
import http from "http"
import { connectDB } from './db/database.js'
import router from "./routes/index.js"
import cors from "cors"
import morgan from 'morgan'
import  ErrorHandler  from './middlewares/error.js'


// Express App

const app = express()

// http server

const server = http.createServer(app);

// Enviroment Setup
dotenv.config()

// Database Connection
connectDB();

// middlewares
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/uploads", express.static("uploads"))

app.use("/api/v1" ,router);
app.use(ErrorHandler)

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
})