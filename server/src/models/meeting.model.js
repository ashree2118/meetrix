import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  meetingId: {
    type: String,
    required: true,
    unique: true,
  },

  attendeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  schedulerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  utcTime: {
    type: Date,
    required: true,
  },

  meetingPurpose: {
    type: String,
    required: true,
  },

  meetingDuration: {
    type: Number,
    required: true, // in minutes
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true
});

export const Meeting = mongoose.model("Meeting", meetingSchema);