import express from "express";
import morgan from "morgan";

// App Init
const app = express();

// Middlewares
app.use(morgan('dev'));

// Routes
app.get('/',(req,res) => {
    res.send({
        data: 'hello world',
    })
})

// Export App
export default app;