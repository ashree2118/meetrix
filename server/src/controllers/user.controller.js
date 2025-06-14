import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    
    //get user details from frontend
    const { name, email, password, timezone } = req.body
    console.log("email: ", email)
    console.log("name: ", name)
    console.log("req.body:", req.body);
    
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
    const userCreated = await User.findById(user._id).select(
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

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        throw new ApiError(400, "email and password is required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400, "User with this email doesn't exist")
    }

    const isPasswordvalid = await user.isPasswordCorrect(password)
    if(!isPasswordvalid){
        throw new ApiError(401, "password is incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200, {user: loggedInUser, accessToken, refreshToken}, "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {new: true});

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export {registerUser, loginUser, logoutUser} 