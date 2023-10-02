import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";
import cloudinary from "cloudinary";


// loding enviroment variables
dotenv.config();

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});


const port = process.env.PORT || 8000;

// cloudinary configuration 
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// start the server
app.listen(port, async() => {
    await connectDatabase();
    console.log(`Server has started on port http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});
