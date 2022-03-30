import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

// App Init
const app = express();

// Middlewares
app.use(morgan('dev'));

// Routes
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req,res) => {
    res.json({
        data: 'hello world',
    })
});

// 404 Handler
app.all('*', (req,res,next) => {
    res.status(404).json(`${req.originalUrl} not found!`);
});

// Global Error Handler
app.use(globalErrorHandler);

// Export App
export default app;