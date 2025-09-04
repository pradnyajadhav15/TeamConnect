import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    // Generate token
    let token = crypto.randomBytes(20).toString("hex");
    user.token = token; // Make sure your User schema has a "token" field
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

export { login, register };
