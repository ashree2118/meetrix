import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({    
    path: "./env"
});
import { DB_NAME } from "../constants.js";





import express from "express";
const app = express();



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;