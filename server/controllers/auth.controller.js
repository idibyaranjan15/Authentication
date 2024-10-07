import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
      throw new Error("All fields are required!");
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a 6-digit verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user
    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });

    // Save the user to the database
    await user.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // Return success response (excluding password)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
