import * as dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";


// loding enviroment variables
dotenv.config();

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});


const port = process.env.PORT || 8000;

// start the server
app.listen(port, async() => {
    await connectDatabase();
    console.log(`Server has started on port http://localhost:${port}`);
});
