'use strict';

const usersModelInfo = (sequelize, DataTypes) => 
    sequelize.define('infousers', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, 
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        city: {
            type: DataTypes.ENUM("Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq", "Jarash", "Ma'an", "Karak", "Madaba", "Ajloun", "Tafilah", "Al-Balqa"),
            defaultValue: 'Amman'
        },
        // active:{
        //     type: DataTypes.ENUM()
        // },
        dataOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        userImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })


module.exports = usersModelInfo;