'use strict';
const villasModel = (sequelize, DataTypes) => 
sequelize.define('villas', {
    userId: {
        type: DataTypes.INTEGER,
        required: true
    },
    process: {
        type: DataTypes.ENUM('Sell','Rent'),
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
    surfaceArea: {
        type: DataTypes.FLOAT,
        required: true
    },
    landArea: {
        type: DataTypes.FLOAT,
        required: true
    },
    floors: {
        type: DataTypes.INTEGER,
        required: true
    },
    buildingAge: {
        type: DataTypes.ENUM('Under-Construction','0-11 months','1-5 years','6-9 years','10-19 years','+20 years'),
        defaultValue:'1-5 years',
        required: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        required: false,
    },
    bathRooms: {
        type: DataTypes.INTEGER,
        required: false,
    },

    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        defaultValue:'Monthly',
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

module.exports = villasModel;