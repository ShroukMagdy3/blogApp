import mongoose from "mongoose";

let connectionPromise = null;

const checkConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!process.env.DB_URL) {
    throw new Error("DB_URL is missing");
  }

  connectionPromise = mongoose
    .connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    })
    .then((mongooseInstance) => {
      console.log("success connection to DB");
      return mongooseInstance.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.log("fail to connectDB", error);
      throw error;
    });

  return connectionPromise;
};
export default checkConnection;
