import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMeetingsGroupedByDate } from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/meetings/grouped", verifyJWT, getMeetingsGroupedByDate);

export default router;
