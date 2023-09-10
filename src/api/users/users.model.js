const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Make sure the correct sequelize instance is used here
const bcrypt = require('bcrypt');

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            // Hash the user's password before saving it to the database
            const saltRounds = 10; // You can adjust this number based on your security needs
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        },
    },
});

module.exports = User;
