const express = require("express");
const router = express.Router();
const { isAuth } = require("../../middlewares/authenticateJwt"); // Corrected import path
const CarRating = require("../../models/ratingCars.model"); // Corrected import path

// POST a new car rating
router.post("/", isAuth, async (req, res) => {
  try {
    // Get data from the request body
    const { car_id, rating } = req.body;
    const user_id = req.user.id; // User ID from authentication middleware

    // Create a new rating record
    const newRating = await CarRating.create({
      car_id,
      user_id,
      rating,
    });

    // Return the newly created rating as a response
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to post car rating" });
  }
});

module.exports = router;

// get rating of user
// get ratings id user
