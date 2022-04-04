import {handleCastErrorDB,handleDuplicateFieldDB,handleJsonWebTokenError,handleTokenExpiredError,handleValidationErrorDB} from './handler.js';

const devError = (err, res) => {
    console.error('ERROR:', err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    });
}

const prodError = (err, res) => {
    if (err.isOperational) {
        // known errors
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // unknown errors
        console.error('ERROR:', err);
        res.status(500).json({
            status: 'error',
            message: 'something went wrong!'
        });
    }
}

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = {...err, message: err.message, stack: err.stack};
    if (!err.isOperational) {
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        else if (err.code === 11000) error = handleDuplicateFieldDB(error);
        else if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
        else if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
        else if (err.name === 'TokenExpiredError') error = handleTokenExpiredError();
    }

    if (process.env.NODE_ENV === 'development') {
        devError(error, res);
    } else if (process.env.NODE_ENV === 'production') {
        prodError(error, res);
    }
}