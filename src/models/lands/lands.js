'use strict';
const landsModel = (sequelize, DataTypes) => 
sequelize.define('lands', {

    userId: {
        type: DataTypes.INTEGER,
        required: true
    },
    process: {
        type: DataTypes.ENUM('Sell','Rent'),
        required: true
    },
    type: {
        type: DataTypes.ENUM('Industrial','Commercial','Agricultural'),
        defaultValue:'Commercial',
        required: true
    },
    owner: {
        type: DataTypes.ENUM('Owner','Broker'),
        defaultValue:'Owner',
        required: true

    },
    price: {
        type: DataTypes.FLOAT,
        required: true
    },
    area: {
        type: DataTypes.FLOAT,
        required: true
    },

    availability : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        defaultValue:'Yearly',
        allowNull: false,
    },

    city: {
        type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","Madaba","Ajloun","Tafilah","Al-Balqa"),
        defaultValue:'Amman',
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    moreInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = landsModel;