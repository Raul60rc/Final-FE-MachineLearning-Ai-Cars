const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); // Import the correct sequelize instance
const bcrypt = require("bcrypt");

const LoginUser = sequelize.define(
  "LoginUser", // Use the correct model name "LoginUser"
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login_users", // You can specify a custom table name if needed
    hooks: {
      beforeCreate: async (user) => {
        // Hash the user's password before saving it to the database
        const saltRounds = 10; // You can adjust this number based on your security needs
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      },
    },
  }
);

module.exports = LoginUser;
