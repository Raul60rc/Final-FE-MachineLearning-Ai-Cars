const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql", // Change this to "mysql" for MySQL
  host: "localhost", // Replace with your database host
  username: "root", // Replace with your database username
  password: "admin", // Replace with your database password
  database: "used_cars", // Replace with your database name
});

module.exports = sequelize;
