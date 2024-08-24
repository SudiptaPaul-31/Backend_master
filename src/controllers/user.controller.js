import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError } from "../utils/ApiError.js"
import { User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {

    //Getting user details: 
    const { fullName, email, username, password } = req.body;
    console.log("email:", email);

    //Validation
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError('All fields are required', 400);
    }

    //check is user already registered
    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if(existedUser) {
        throw new ApiError('User already exists', 409)
    }

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError('Avatar is required', 400); 
    }

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError('Avatar is required',400)
    }

    // create user object - create entry in db 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    // check for user creation
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError('User creation failed', 500);
    }

    // return response
    return res.status(201).json(
        new ApiResonse(200, createdUser, "User registered successfully")
    )
});

export { registerUser };
