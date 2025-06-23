import { Meeting } from "../models/meeting.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";

// GET: Group meetings by date (calendar view for logged-in attendee)
const getMeetingsGroupedByDate = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetings = await Meeting.aggregate([
      {
        $match: {
          attendeeId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$utcTime" } },
          meetings: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, meetings, "Meetings grouped by date"));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST: Schedule a new meeting (from public form)
const scheduleMeeting = async (req, res) => {
  try {
    const { attendeeUserId, utcTime, meetingPurpose, meetingDuration, schedulerName, schedulerEmail } = req.body;

    if (!attendeeUserId || !utcTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if attendee exists
    const attendee = await User.findById(attendeeUserId);
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    // Optionally check if a meeting already exists at that time (conflict detection)
    const conflict = await Meeting.findOne({
      attendeeId: attendeeUserId,
      utcTime: new Date(utcTime),
    });

    if (conflict) {
      return res.status(409).json({ message: "This time slot is already booked" });
    }

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      attendeeId: attendeeUserId,
      schedulerId: null, // optional: if user is unregistered
      utcTime,
      meetingPurpose,
      meetingDuration: meetingDuration || 30,
      schedulerDetails: {
        name: schedulerName,
        email: schedulerEmail,
      },
    });

    return res.status(201).json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  getMeetingsGroupedByDate,
  scheduleMeeting
};