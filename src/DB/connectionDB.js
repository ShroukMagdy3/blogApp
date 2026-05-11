import mongoose from "mongoose";

const checkConnection = async () => {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  await mongoose
    .connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      bufferCommands: false, // Disable mongoose buffering
    })
    .then(() => {
      console.log("success connection to DB");
    })
    .catch((error) => {
      console.log(error);

      console.log("fail to connectDB");
    });
};
export default checkConnection;
