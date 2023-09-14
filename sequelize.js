const Sequelize = require("sequelize");

const sequelize = new Sequelize("used_cars", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
}); // used_car is the database , root is the username & admin is the password

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
