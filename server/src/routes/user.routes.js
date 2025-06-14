import express from "express";
import multer from "multer";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

// If you want to use upload.none() as middleware for a specific route:
router.post("/register", upload.none(), registerUser);

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

export default router;