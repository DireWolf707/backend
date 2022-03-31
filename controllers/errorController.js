const devError = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const prodError = (err,res) => {
    if (err.isOperational) {
        // known errors
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // unknown errors
        console.error('ERROR:', err);
        res.status(500).json({
            status: 'error',
            message: 'something went wrong!'
        })
    }
}

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (process.env.NODE_ENV == 'development') {
        devError(err,res);
    } else if (process.env.NODE_ENV == 'production') {
        prodError(err,res);
    }
}