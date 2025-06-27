import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';
import meetingRoutes from './routes/meetings.routes.js';

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://meetrix.vercel.app/",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Test route (optional but nice for debugging)
app.get("/test", (req, res) => {
    res.send("Test route working!");
});

// API Routes
app.use("/api/v1/users", userRouter);      // User auth/profile routes
app.use("/api/v1", meetingRoutes);         // Meetings-related routes

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method
    });
});

export { app };
