'use strict';
const chaletsModel = (sequelize, DataTypes) => 
sequelize.define('chalets', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    process: {
        type: DataTypes.ENUM('Sell','Rent'),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.ENUM('Owner','Broker'),
        defaultValue: 'Owner',
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    surfaceArea: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    landArea: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    buildingAge: {
        type: DataTypes.ENUM('Under-Construction','0-11 months','1-5 years','6-9 years','10-19 years','+20 years'),
        defaultValue: '1-5 years',
    },
    rooms: {
        type: DataTypes.ENUM('1-Bedroom', '2-Bedrooms','3-Bedrooms','4-Bedrooms','5-Bedrooms','+6-Bedrooms'),
        defaultValue: '3-Bedrooms',
    },
    bathrooms: {
        type: DataTypes.ENUM('1-Bathroom','2-Bathrooms','3-Bathrooms','4-Bathrooms','+5-Bathrooms'),
        defaultValue: '3-Bathrooms',
    },
    availability : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        defaultValue: 'Daily',
    },
    city: {
        type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","Madaba","Ajloun","Tafilah","Al-Balqa"),
        defaultValue: 'Amman',
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    moreInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url1: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    ,
    url2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url2: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = chaletsModel;
