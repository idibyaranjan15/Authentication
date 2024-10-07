import jwt from "jsonwebtoken";
import { JWT_KEY, NODE_ENV } from "../constants/constants.js";

export const generateTokenAndSetCookie = (res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, JWT_KEY, { expiresIn: "7d" });

  // Set secure flag based on environment
  const isProduction = NODE_ENV === "production";

  // Set cookie with JWT token
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production (HTTPS)
    sameSite: "strict", // For CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // Return the token (optional, if you need it for further use)
  return token;
};
