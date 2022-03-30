// Setting Environment Variables
import dotenv from "dotenv";
dotenv.config({path:'./.env'});

// Running App
import app from "./app.js";
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

// Graceful Shutdown Handler
const gracefulShutdownHandler = () => {
    console.info('Closing Server');
    server.close(() => {
      console.info('Server Closed');
      process.exit(0);
    })
}
process.on('SIGINT', gracefulShutdownHandler)
process.on('SIGTERM', gracefulShutdownHandler)

