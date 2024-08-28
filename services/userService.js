// services/userService.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getAllUsers = async () => {
  return await User.find();
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    if (user.status === "inactive") {
      throw new Error("Your account is inactive. Please verify your account.");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
      // { expiresIn: "1d" }
    );
    return { user, token };
  } else {
    throw new Error("Invalid email or password");
  }
};

const getPin = async (userCredential) => {
  const newPin = Math.floor(100000 + Math.random() * 900000).toString();
  const user = await User.findOne({
    $or: [{ email: userCredential }, { phone: userCredential }],
  });
  if (user) {
    user.pin = newPin;
    await user.save();
    return newPin;
  } else {
    throw new Error("User not found");
  }
};

const verifyPin = async (userCredential, pin) => {
  const user = await User.findOne({
    $or: [{ email: userCredential }, { phone: userCredential }],
  });
  if (user) {
    if (user.pin === pin) {
      user.status = "active";
      user.pin = "";
      await user.save();
      return true;
    } else {
      throw new Error("Invalid pin");
    }
  } else {
    throw new Error("User not found");
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  authenticateUser,
  getPin,
  verifyPin,
};
