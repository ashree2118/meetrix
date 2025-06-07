import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    
    //get user details from frontend
    const { name, email, password, timezone } = req.body
    console.log("email: ", email)
    
    //some method checks if any of the fields are empty
    if (
        [name, email, password, timezone].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
     
    //write fuction for validations of each
    
    //check if the user already exists
    const existedUser = await User.findOne({
        $or: [{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with this email already exists")
    }
    
    //creating user entry in database
    const userId = uuidv4();
    const profileLink = `https://meetrix.com/profile/${userId}`;
    const user = await User.create({
        name,
        email,
        password,
        timezone,
        profileLink,
        userId
    })

    //remove password and other fields
    const userCreated = await User.fondById(user._id).select(
        "-password -userId"
    )

    //check if the user is created
    if(!userCreated){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //return response or error
    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered successfully")
    )

})


export {registerUser} 