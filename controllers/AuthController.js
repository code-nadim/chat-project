import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

// Register Controller
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || !req.file) {
      return res.status(400).json({
        success: false,
        message: `${!name ? "Name" : !email ? "Email" : !password ? "Password" : "Profile"} is required`,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imagePath = `${baseUrl}/images/${req.file.filename}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      profile: imagePath,
    });

    res.status(201).json({ success: true, user, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email is required" });
    if (!password)
      return res.status(400).json({ success: false, message: "Password is required" });

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Return user data without password
    const { _id, name, profile } = existingUser;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { _id, name, email, profile },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Users Controller
export const GetUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); // Exclude passwords

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users, message: "Users retrieved successfully" });
  } catch (error) {
    console.error("GetUsers error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
