import events from "events";
events.EventEmitter.defaultMaxListeners = 20;

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({    
    path: "./env"
});

connectDB()
.then(() =>{
    app.on("error", (error) => {
        console.log("error", error);
        throw error
    })
    app.listen(process.env.PORY || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB cnnection failed", error);
})



