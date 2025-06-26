// console.log("Index.js loaded");
import events from "events";
events.EventEmitter.defaultMaxListeners = 20;

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; // <-- use the configured app

dotenv.config({    
    path: "./env"
});

connectDB()
.then(() =>{
    app.on("error", (error) => {
        console.log("error", error);
        throw error
    })
    app.listen(process.env.PORT || 9000, () => {
        console.log(` Server is running at port : ${process.env.PORT || 9000}`);

    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
});