'use strict';
const chaletsModel = (sequelize, DataTypes) => 
sequelize.define('chalets', {
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
    buildingAge: {
        type: DataTypes.ENUM('Under-Construction','0-11 months','1-5 years','6-9 years','10-19 years','+20 years'),
        allowNull: false,
    },
    rooms: {
        type: DataTypes.ENUM('1-Bedroom', '2-Bedrooms','3-Bedrooms','4-Bedrooms','5-Bedrooms','+6-Bedrooms'),
        allowNull: false,
    },
    bathrooms: {
        type: DataTypes.ENUM('1-Bathroom','2-Bathrooms','3-Bathrooms','4-Bathrooms','+5-Bathrooms'),
        allowNull: false,
    },
    avilability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        allowNull: false,
    },
    city: {
        type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","AL-Salt","Ajloun","Tafilah","Al-Balqa"),
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

module.exports = chaletsModel;
