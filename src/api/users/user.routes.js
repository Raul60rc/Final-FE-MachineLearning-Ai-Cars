const express = require("express");
const User = require("./users.model.js");
const { DELETE, UPDATE } = require("sequelize/types/query-types");

const router = express.Router();

// Get all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// get users by ID
// update user by ID
// delete user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const userId = await User.find();
    res.json(userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
