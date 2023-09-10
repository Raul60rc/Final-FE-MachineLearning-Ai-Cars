const express = require("express");
const User = require("./users.model.js");
const { DELETE, UPDATE, READ } = require("sequelize/types/query-types");


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


router.get("/users/:delete", async (req,res) =>{

})