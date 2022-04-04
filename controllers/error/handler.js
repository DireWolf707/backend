import AppError from '../../utils/appError.js';

//ObjectId
export const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

export const handleDuplicateFieldDB = err => {
    const value = Object.keys(err.keyValue);
    const message = `${value} is already used!`;
    return new AppError(message, 400);
}

export const handleValidationErrorDB = err => {
    return new AppError(err.message, 400);
}

export const handleJsonWebTokenError = () => new AppError("Invalid token! please login again", 401);

export const handleTokenExpiredError = () => new AppError("token has expired! please login again", 401);