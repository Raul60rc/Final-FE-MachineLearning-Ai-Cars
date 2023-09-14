const express = require("express");
const RegisterUser = require("./registerUser.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../../middlewares/authenticateJwt.js"); // Import your JWT secret properly
const authenticateJwtMiddleware = require("../../middlewares/authenticateJwt.js"); // Import your JWT middleware properly

const router = express.Router();

// User Registration (Create)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the email already exists in the database
    const existingUser = await RegisterUser.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await RegisterUser.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login (Authenticate and Generate Token)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Profile Retrieval (Read)
router.get("/profile", authenticateJwtMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Profile Update (Update)
router.put("/profile", authenticateJwtMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body; // Include only updatable fields
    const userId = req.user.id;
    const updatedUser = await RegisterUser.update(
      { name, email },
      { where: { id: userId } }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Account Deletion (Delete)
router.delete("/profile", authenticateJwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await RegisterUser.destroy({ where: { id: userId } });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

//
