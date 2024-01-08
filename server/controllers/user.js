import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user)
      return res.status(400).send({ error: "Invalid username or password 1" });

    // const isValid = await bcrypt.compare(password, user.password);
    // console.log(isValid);

    if (password !== user.password)
      return res.status(400).send({ error: "Invalid username or password" });

    const accessToken = jwt.sign(
      { userId: user._id, role: user.userRole },
      "secret",
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.userRole },
      "refresh",
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("cookie");
  return res.send({ message: "Successfully logged out" });
};
