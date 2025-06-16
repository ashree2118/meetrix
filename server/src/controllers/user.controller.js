import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

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
    console.log("email: ", email)
    
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

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if(!incomingRefreshToken){
        throw new ApiError(401, "Refresh token is required")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "invalid refresh token")      
        }
        if(incomingRefreshToken !== user.refreshToken){
            throw new ApiError(401, "refresh token is expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed successfully")
    } catch (error) {
        throw new ApiError(401, error?.message || "Something went wrong while refreshing access token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) =>{
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave: false})
    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res.status(200).json(200, req.user, "current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {name, email, timezone} = req.body
    const user = await User.findByIdAndUpdate(req.user._id,{
        $set: {
            name,
            email,
            timezone
        }
    }, {new: true}).select("-password -refreshToken")

    if(!user){
        throw new ApiError(404, "User not found")
    }

    await user.save({validateBeforeSave: false})

    return res.status(200).json(new ApiResponse(200, user, "User details updated successfully"))
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails}