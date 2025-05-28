import events from "events";
events.EventEmitter.defaultMaxListeners = 20;

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({    
    path: "./env"
});

const app = express();

connectDB()
.then(() =>{
    app.on("error", (error) => {
        console.log("error", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT || 8000}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
})



