import mongoose from "mongoose";

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  try {
    const connecting = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      'Database connected succesfully to host'
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDatabase;
