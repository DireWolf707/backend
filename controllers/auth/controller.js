import jwt from "jsonwebtoken";
import User from "../../models/userModels.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import AppError from "../../utils/appError.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const sendTokenCookieResponse = (user, res) => {
    // Gen Token
    const token = signToken(user._id);
    // Send Response With Cookie (jwt)
    res.cookie('jwt', token, {
        expires: new Date( Date.now() + 24*60*60*1000 ), // 24hrs in ms
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'lax'
    }).status(200).json({
        status: 'success',
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    })
}

const sendResponse = (user, res) => {
    res.status(200).json({
        status: 'success',
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    })
}

export const signup = asyncWrapper(async (req,res,next) => {
    // Create User
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });
    // Gen Token
    const token = signToken(user._id)
    // Send Response
    sendTokenCookieResponse(user, res);
})

export const login = asyncWrapper(async (req,res,next) => {
    const { username, password } = req.body;
    // check user exist and password
    const user = await User.findOne({ username: username });
    if (!user || !(await user.checkPassword(password)) ) {
        next(new AppError('Incorrect email or password!', 401));
        throw new AppError('Incorrect email or password!', 401);
    }
    // Send Response
    sendTokenCookieResponse(user, res);
})

export const logout = (req,res,next) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'lax'
    }).status(200).json({
        status: 'success'
    })
}

export const userProfile = (req,res,next) => {
    const user = req.user;
    // Send Response
    sendResponse(user, res);
}

export const userUpdate = asyncWrapper(async (req,res,next) => {
    let user = req.user;
    // remove unwanted fields
    ["role","password","_id"].forEach(field => delete req.body[field]);
    // update user
    user.set({...req.body});
    user = await user.save();
    // Send Response
    sendResponse(user, res);
})

export const passwordUpdate = asyncWrapper(async (req,res,next) => {
    let user = req.user;
    const { pass, pass1 } = req.body;
    if ( !(await user.checkPassword(pass)) ) {
        throw new AppError('Current password is incorrect!', 401);
    }
    // update password
    user.set({ password: pass1 });
    user = await user.save();
    // Send Response
    sendResponse(user, res);
})