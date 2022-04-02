import jwt from "jsonwebtoken";
import {promisify} from 'util';
import User from "../../models/userModels.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import AppError from "../../utils/appError.js";

export const loginRequired = asyncWrapper(async (req,res,next) => {
    // get token
    let token = req.cookies.jwt;
    if (!token) {
        throw new AppError('you are not logged in!', 401);
    }
    // validate token 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // check if user exists
    const user = await User.findById(decoded.id).select('-__v -updatedAt');
    if (!user) {
        throw new AppError("user belonging to the token don't exist anymore!", 400); 
    }
    // assign user object to request
    req.user = user;

    next();
})

export const authorize = (...roles) => {
    return (req,res,next) => {
        if ( !roles.includes(req.user.role) ) {
            throw new AppError('access denied', 403)
        }
        
        next();
    }
}