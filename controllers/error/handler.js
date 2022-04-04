import AppError from '../../utils/appError.js';

//ObjectId
export const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message,400)
}

export const handleDuplicateFieldDB = err => {
    const value = Object.keys(err.keyValue);
    const message = `Duplicate field: ${value}`
    return new AppError(message,400)
}

export const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(e => e.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message,400)
}

export const handleJsonWebTokenError = () => new AppError("Invalid token! please login again", 401);

export const handleTokenExpiredError = () => new AppError("token has expired! please login again", 401);