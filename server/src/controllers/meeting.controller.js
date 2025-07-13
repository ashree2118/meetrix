// import { Meeting } from "../models/meeting.model.js";
// import { User } from "../models/user.model.js";
// import mongoose from "mongoose";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { v4 as uuidv4 } from "uuid";
// import sendMeetingConfirmation from '../services/emailService.js'; // adjust path

// // GET: Group meetings by date (for logged-in user only)
// const getMeetingsGroupedByDate = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const meetings = await Meeting.aggregate([
//       {
//         $match: {
//           attendeeId: new mongoose.Types.ObjectId(userId),
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
//     console.error("Error in getMeetingsGroupedByDate:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // POST: Publicly schedules a meeting for someone
// const scheduleMeeting = async (req, res) => {
//   try {
//     const { attendeeUserId, utcTime, meetingPurpose, meetingDuration, schedulerName, schedulerEmail } = req.body;

//     if (!attendeeUserId || !utcTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const attendee = await User.findById(attendeeUserId);
//     if (!attendee) return res.status(404).json({ message: "Attendee not found" });

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

//     // Format date for emails
//     const formattedDate = new Date(meeting.utcTime).toLocaleString('en-IN', {
//       dateStyle: 'full',
//       timeStyle: 'short',
//       timeZone: 'Asia/Kolkata',
//     });

//     // Email to scheduler
//     console.log("Sending email to:", schedulerEmail);
//     await Promise.all([
//   sendMeetingConfirmation({
//     toEmail: schedulerEmail,
//     toName: schedulerName,
//     subject: 'Your Meeting is Scheduled',
//     content: `<p>Hi ${schedulerName},</p>
//       <p>Your meeting with ${attendee.name} is scheduled for <strong>${formattedDate}</strong>.</p>
//       <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
//   }),
//   sendMeetingConfirmation({
//     toEmail: attendee.email,
//     toName: attendee.name,
//     subject: 'New Meeting Scheduled',
//     content: `<p>Hi ${attendee.name},</p>
//       <p>${schedulerName} has scheduled a meeting with you on <strong>${formattedDate}</strong>.</p>
//       <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
//   }),
// ])

//     return res.status(201).json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
//   } catch (error) {
//     console.error("Error scheduling meeting:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // GET: Fetch booked meeting slots for a specific date
// const getBookedSlotsByDate = async (req, res) => {
//   try {
//     const { date } = req.params;
//     const { user } = req.query;

//     if (!date || !user) {
//       return res.status(400).json({ message: "Date and user ID are required" });
//     }

//     const start = new Date(date + "T00:00:00.000Z");
//     const end = new Date(date + "T23:59:59.999Z");

//     const meetings = await Meeting.find({
//       attendeeId: user,
//       utcTime: { $gte: start, $lte: end }
//     });

//     const bookedTimes = meetings.map(m => m.utcTime);

//     return res.status(200).json(new ApiResponse(200, bookedTimes, "Booked slots for the date"));
//   } catch (error) {
//     console.error("Error in getBookedSlotsByDate:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };


// export {
//   getMeetingsGroupedByDate,
//   scheduleMeeting,
//   getBookedSlotsByDate
// };
import { Meeting } from "../models/meeting.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import sendMeetingConfirmation from "../services/emailService.js";

// GET: Meetings grouped by date (for logged-in attendee)
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

// GET: Meetings scheduled by logged-in user (if scheduler)
const getMeetingsScheduledByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetings = await Meeting.find({ schedulerId: userId }).sort({
      utcTime: 1,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, meetings, "Meetings scheduled by user"));
  } catch (error) {
    console.error("Error in getMeetingsScheduledByUser:", error);
    return res.status(500).json({ message: error.message });
  }
};

// POST: Schedule a new meeting (public)
const scheduleMeeting = async (req, res) => {
  try {
    const {
      attendeeUserId,
      utcTime,
      meetingPurpose,
      meetingDuration,
      schedulerName,
      schedulerEmail,
      note,
    } = req.body;

    if (
      !attendeeUserId ||
      !utcTime ||
      !meetingPurpose ||
      !schedulerName ||
      !schedulerEmail
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const attendee = await User.findById(attendeeUserId);
    if (!attendee)
      return res.status(404).json({ message: "Attendee not found" });

    // Check for scheduling conflict
    const conflict = await Meeting.findOne({
      attendeeId: attendeeUserId,
      utcTime: new Date(utcTime),
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked" });
    }

    // ✅ If scheduler is registered user, attach their _id
    const schedulerUser = await User.findOne({ email: schedulerEmail });

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      attendeeId: attendeeUserId,
      schedulerId: schedulerUser ? schedulerUser._id : null,
      schedulerName,
      schedulerEmail,
      utcTime,
      meetingPurpose,
      meetingDuration: meetingDuration || 30,
      note: note || "",
    });

    // Format date for email
    const formattedDate = new Date(meeting.utcTime).toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    // Send emails
    await Promise.all([
      sendMeetingConfirmation({
        toEmail: schedulerEmail,
        toName: schedulerName,
        subject: "Your Meeting is Scheduled",
        content: `<p>Hi ${schedulerName},</p>
          <p>Your meeting with ${attendee.name} is scheduled for <strong>${formattedDate}</strong>.</p>
          <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
      }),
      sendMeetingConfirmation({
        toEmail: attendee.email,
        toName: attendee.name,
        subject: "New Meeting Scheduled",
        content: `<p>Hi ${attendee.name},</p>
          <p>${schedulerName} has scheduled a meeting with you on <strong>${formattedDate}</strong>.</p>
          <p>Purpose: <strong>${meetingPurpose}</strong></p>`,
      }),
    ]);

    return res
      .status(201)
      .json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET: Fetch booked slots for a date (for calendar)
const getBookedSlotsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const { user } = req.query;

    if (!date || !user) {
      return res
        .status(400)
        .json({ message: "Date and user ID are required" });
    }

    const start = new Date(date + "T00:00:00.000Z");
    const end = new Date(date + "T23:59:59.999Z");

    const meetings = await Meeting.find({
      attendeeId: user,
      utcTime: { $gte: start, $lte: end },
    });

    const bookedTimes = meetings.map((m) => m.utcTime);

    return res
      .status(200)
      .json(new ApiResponse(200, bookedTimes, "Booked slots for the date"));
  } catch (error) {
    console.error("Error in getBookedSlotsByDate:", error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  getMeetingsGroupedByDate,
  getMeetingsScheduledByUser,
  scheduleMeeting,
  getBookedSlotsByDate,
};
