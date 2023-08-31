const sequelize = require("../helper/common/init_mysql")

const DataTypes = require("sequelize");

const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
}, {
    timestamps: true
});

User.sync({ force: true })
    .then(() => {
        console.log('User table is synchronized.');
    })
    .catch((error) => {
        console.error('Error synchronizing Product table:', error);
    });

module.exports = User;