import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
  {
    meetingId: {
      type: String,
      required: true,
      unique: true,
    },

    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Remove this if you're not forcing scheduler to register
    // schedulerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },

    schedulerName: {
      type: String,
      required: true,
    },

    schedulerEmail: {
      type: String,
      required: true,
    },

    schedulerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
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

    note: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
