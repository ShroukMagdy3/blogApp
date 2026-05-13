import mongoose from "mongoose";

const checkConnection = async () => {
  await mongoose
    .connect( process.env.DB_URL)
    .then(() => {
      
      console.log("success connection to DB");
    })
    .catch((error) => {
      console.log(process.env.DB_URL);
      console.log(error);
      
      console.log("fail to connectDB");
    });
};
export default checkConnection;