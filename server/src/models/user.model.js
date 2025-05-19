import mongoose, { Schema } from mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },

    password: {
        type: String,
        required: true,
    },

    timezone: {
        type: String,
        required: true,

    },

    profileLink: {
        type: String,
        required: true,
        unique: true,
    },
});


export const User = mongoose.model("User", userSchema)