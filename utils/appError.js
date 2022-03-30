class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // Is Error Known
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default AppError; 