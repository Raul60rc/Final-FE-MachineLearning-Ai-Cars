const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const validSpanishProvinces = require('./provinces'); // Import the array of valid provinces

const Cars = sequelize.define("Cars", {
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fuel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    door: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shift: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_professional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [validSpanishProvinces],
                msg: 'Invalid Spanish Province',
            },
        },
    },
    country: {
        type: DataTypes.ENUM('Spain'),
        allowNull: false,
        defaultValue: 'Spain',
    },
});

module.exports = Cars;
