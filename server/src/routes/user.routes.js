import express from "express";
import multer from "multer";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

// If you want to use upload.none() as middleware for a specific route:
router.post("/register", upload.none(), registerUser);

export default router;