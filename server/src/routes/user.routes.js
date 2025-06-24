import express from "express";
import multer from "multer";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails ,getUserByUsername} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();


router.post("/register", upload.none(), registerUser);
router.post("/login", upload.none(), loginUser);

router.post("/logout", verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.get("/change-password", verifyJWT, changeCurrentPassword);
router.get("/current-user", verifyJWT, getCurrentUser);
router.patch("/update-account", verifyJWT, updateAccountDetails);
router.get("/by-username/:username", getUserByUsername)

export default router;