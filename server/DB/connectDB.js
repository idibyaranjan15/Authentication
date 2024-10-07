import mongoose from "mongoose";
import { DB_Name, MongoDB_URI } from "../constants/constants.js";
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MongoDB_URI}/${DB_Name}`
    );
    console.log(
      `Database connected successfully !!! ${connectionInstance.connection.host} ---DB-Name : ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log("Database connection error ", error);
    process.exit(1);
  }
};
