import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, timezone } = req.body
    console.log("email: ", email)
    
    if (
        [name, email, password, timezone].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    //some method checks if any of the fields are empty 
    //write fuction for validations of each
    const existedUser = User.findOne({
        $or: [{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with this email already exists")
    }

})


export {registerUser} 