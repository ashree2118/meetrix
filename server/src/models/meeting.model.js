import mongoose, { Schema } from mongoose;

const meetingSchema = new Schema({
    meetingId: {
    type: String, 
    required: true,
    unique: true,
  },
  
  attendeeId: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true,
 }],

  schedulerId: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true,
 }],
  
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
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Meeting = mongoose.model("Meeting", meetingSchema)