import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getMeetingsGroupedByDate,
  scheduleMeeting
} from "../controllers/meeting.controller.js";

const router = express.Router();

// Logged-in user only
router.get('/meetings/grouped', verifyJWT, getMeetingsGroupedByDate);

// Public
router.post('/meetings/schedule', scheduleMeeting);

export default router;
