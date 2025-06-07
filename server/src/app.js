// console.log("App.js loaded");
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
app.use(cookieParser())



app.get("/test", (req, res) => {
    res.send("Test route working!");
});
import userRouter from './routes/user.routes.js' 

app.use("/api/v1/users", userRouter)



app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found", path: req.path, method: req.method });
});



export { app }