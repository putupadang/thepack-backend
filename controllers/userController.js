// controllers/userController.js
const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.authenticateUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPin = async (req, res) => {
  try {
    const { userCredential } = req.body;
    const pin = await userService.getPin(userCredential);
    res.status(200).json({ pin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyPin = async (req, res) => {
  try {
    const { userCredential, pin } = req.body;
    const result = await userService.verifyPin(userCredential, pin);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
