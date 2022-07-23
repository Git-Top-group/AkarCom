'use strict';
const apartmentsModel = (sequelize, DataTypes) => 
sequelize.define('apartments', {
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
        defaultValue: 'Owner',
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
    floorNum: {
        type: DataTypes.ENUM('Basement','Ground-Floor','First-Floor','Second-Floor','Third-Floor','Fourth-Floor','Fifth-Floor','Higher than 5'),
        defaultValue: 'First-Floor',
        required: true
    },
    buildingAge: {
        type: DataTypes.ENUM('Under-Construction','0-11 months','1-5 years','6-9 years','10-19 years','+20 years'),
        defaultValue: '1-5 years',
        required: true
    },
    rooms: {
        type: DataTypes.ENUM('Studio','1-Bedroom', '2-Bedrooms','3-Bedrooms','4-Bedrooms','5-Bedrooms','+6-Bedrooms'),
        defaultValue: '3-Bedrooms',
        required: true
    },
    bathrooms: {
        type: DataTypes.ENUM('1-Bathroom','2-Bathrooms','3-Bathrooms','4-Bathrooms','+5-Bathrooms'),
        defaultValue: '3-Bathrooms',
        required: true
    },
    availability : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    elevator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        defaultValue: 'Monthly',
        required: true
    },
    city: {
        type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","Madaba","Ajloun","Tafilah","Al-Balqa"),
        defaultValue: 'Amman',
        required: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    finishing: {
        type: DataTypes.ENUM("Unfinished","Semi-Finished","Fully-Finished","Lux","Super-Lux","Ultra-Lux","Deluxe"),
        defaultValue: 'Fully-Finished',
        required: true
    },
    moreInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = apartmentsModel;