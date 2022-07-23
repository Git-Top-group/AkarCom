'use strict';
const usersModel = (sequelize, DataTypes) =>
    sequelize.define('users', {

        username: {
            type: DataTypes.INTEGER,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true

        },
        role: {
            type: DataTypes.ENUM('Sell', 'Rent'),
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
            type: DataTypes.STRING,
            required: false

        },
        email: {
            type: DataTypes.STRING,
            required: false

        },

        city: {
            type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","Madaba","Ajloun","Tafilah","Al-Balqa"),
            defaultValue:'Amman',
            allowNull: false,
        },
        dataOfBirth: {
            type: DataTypes.DATE,
            required: false
        }
    });

module.exports = usersModel;