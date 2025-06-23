import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMeetingsGroupedByDate , scheduleMeeting} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/meetings/grouped", verifyJWT, getMeetingsGroupedByDate);
router.post("/meetings/schedule", verifyJWT, scheduleMeeting);

export default router;
