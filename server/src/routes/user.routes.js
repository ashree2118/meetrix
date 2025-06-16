import express from "express";
import multer from "multer";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

// Use upload.none() for both register and login to support form-data
router.post("/register", upload.none(), registerUser);
router.post("/login", upload.none(), loginUser);

router.post("/logout", verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;