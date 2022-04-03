import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";

// App Init
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

// Routes
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req,res) => {
    res.json({
        data: 'hello world',
    })
});

app.use('/user',userRouter);

// 404 Handler
app.all('*', (req,res,next) => {
    res.status(404).json(`${req.originalUrl} not found!`);
});

// Global Error Handler
app.use(globalErrorHandler);

// Export App
export default app;