// import { Meeting } from "../models/meeting.model.js";
// import { User } from "../models/user.model.js";
// import mongoose from "mongoose";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { v4 as uuidv4 } from "uuid";

// // GET: Group meetings by date (calendar view for logged-in attendee)
// const getMeetingsGroupedByDate = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const meetings = await Meeting.aggregate([
//       {
//         $match: {
//           attendeeId: mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$utcTime" } },
//           meetings: { $push: "$$ROOT" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { "_id": 1 },
//       },
//     ]);

//     return res
//       .status(200)
//       .json(new ApiResponse(200, meetings, "Meetings grouped by date"));
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // POST: Schedule a new meeting (from public form)
// const scheduleMeeting = async (req, res) => {
//   try {
//     const { attendeeUserId, utcTime, meetingPurpose, meetingDuration, schedulerName, schedulerEmail } = req.body;

//     if (!attendeeUserId || !utcTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if attendee exists
//     const attendee = await User.findById(attendeeUserId);
//     if (!attendee) {
//       return res.status(404).json({ message: "Attendee not found" });
//     }

//     // Optionally check if a meeting already exists at that time (conflict detection)
//     const conflict = await Meeting.findOne({
//       attendeeId: attendeeUserId,
//       utcTime: new Date(utcTime),
//     });

//     if (conflict) {
//       return res.status(409).json({ message: "This time slot is already booked" });
//     }

//     const meeting = await Meeting.create({
//       meetingId: uuidv4(),
//       attendeeId: attendeeUserId,
//       schedulerId: null,
//       utcTime,
//       meetingPurpose,
//       meetingDuration: meetingDuration || 30,
//       schedulerName,
//       schedulerEmail,
//     });

//     return res.status(201).json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
//   } catch (error) {
//     console.error("Error scheduling meeting:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// const getMeetingsGroupedByUsername = async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const meetings = await Meeting.aggregate([
//       { $match: { attendeeId: mongoose.Types.ObjectId(user._id) } },
//       /* same grouping logic as before */
//     ]);

//     return res.status(200).json(new ApiResponse(200, meetings, "Grouped meetings"));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // Removed erroneous global console.log statements that referenced out-of-scope variables

// export {
//   getMeetingsGroupedByDate,
//   getMeetingsGroupedByUsername,
//   scheduleMeeting
// };

import { Meeting } from "../models/meeting.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import sendMeetingConfirmation from '../servicesemailService.js'; // adjust path

// GET: Group meetings by date (for logged-in user only)
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
    console.error("Error in getMeetingsGroupedByDate:", error);
    return res.status(500).json({ message: error.message });
  }
};

// POST: Publicly schedules a meeting for someone
const scheduleMeeting = async (req, res) => {
  try {
    const { attendeeUserId, utcTime, meetingPurpose, meetingDuration, schedulerName, schedulerEmail } = req.body;

    if (!attendeeUserId || !utcTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const attendee = await User.findById(attendeeUserId);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

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
      schedulerId: null,
      utcTime,
      meetingPurpose,
      meetingDuration: meetingDuration || 30,
      schedulerName,
      schedulerEmail,
    });

    // Format date for emails
    const formattedDate = new Date(meeting.utcTime).toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    // Email to scheduler
    await sendMeetingConfirmation({
      toEmail: schedulerEmail,
      toName: schedulerName,
      subject: 'Your Meeting is Scheduled',
      content: `<p>Hi ${schedulerName},</p>
        <p>Your meeting with ${attendee.name} is scheduled for <strong>${formattedDate}</strong>.</p>
        <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
    });

    // Email to attendee
    await sendMeetingConfirmation({
      toEmail: attendee.email,
      toName: attendee.name,
      subject: 'New Meeting Scheduled',
      content: `<p>Hi ${attendee.name},</p>
        <p>${schedulerName} has scheduled a meeting with you on <strong>${formattedDate}</strong>.</p>
        <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
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
