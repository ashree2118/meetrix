import { Meeting } from "../models/meeting.model.js";
import mongoose from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";

// Get all meetings for an attendee, grouped by date (for calendar view)
const getMeetingsGroupedByDate = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetings = await Meeting.aggregate([
      {
        $match: {
          attendeeId: new mongoose.Types.ObjectId(userId),
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

export default {
  getMeetingsGroupedByDate,
};