import dotenv from "dotenv";
dotenv.config();
export const DB_Name = "authentication-MERN";
export const Port = process.env.PORT || 5006;
export const MongoDB_URI = process.env.MongoDB_URI;
export const JWT_KEY = process.env.JWT_SECRETKEY;
export const NODE_ENV = process.env.NODE_ENV;
