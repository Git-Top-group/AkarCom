'use strict';
const usersModel = (sequelize, DataTypes) =>
    sequelize.define('users', {

        userId: {
            type: DataTypes.INTEGER,
            required: true
        },
        username: {
            type: DataTypes.INTEGER,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true

        },
        role: {
            type: DataTypes.ENUM('sell', 'rent'),
            required: false
        },
        firstName: {
            type: DataTypes.STRING,
            required: false

        },
        lastName: {
            type: DataTypes.STRING,
            required: false

        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            required: false

        },
        email: {
            type: DataTypes.STRING,
            required: false

        },

        city: {
            type: DataTypes.ENUM("Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq", "Jarash", "Ma'an", "Karak", "AL-Salt", "Ajloun", "Tafilah", "al-Balqa"),
            allowNull: false,
        },

        profilePic: {
            type: DataTypes.STRING,
            required: false
        },

        dataOfBirth: {
            type: DataTypes.DATE,
            required: false
        }
    });

module.exports = usersModel;