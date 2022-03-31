// Setting Environment Variables
import dotenv from "dotenv";
dotenv.config({path:'./.env'});

// Mongo Client Init
import mongoose from "mongoose";
try {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB CONNECTION SUCCESSFUL!!");
} catch (error) {
  console.log(error);
  process.exit(1);
}

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

