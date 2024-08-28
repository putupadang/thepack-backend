// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

router.post("/", userController.createUser);
router.get("/:id", verifyToken, userController.getUserById);
router.get("/", verifyToken, userController.getAllUsers);
router.post("/login", userController.authenticateUser);
router.post("/get-pin", userController.getPin);
router.post("/verify-pin", userController.verifyPin);

module.exports = router;
