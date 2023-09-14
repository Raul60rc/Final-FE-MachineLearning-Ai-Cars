const express = require("express");
const sequelize = require("./sequelize"); // Correct path to sequelize.js
const app = express();

// ... Define your Express routes and middleware ...

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database tables have been created (if not already exist).");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Start your Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
