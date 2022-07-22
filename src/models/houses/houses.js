'use strict';
const housesModel = (sequelize, DataTypes) => 
sequelize.define('houses', {
    
    userId: {
        type: DataTypes.INTEGER,
        required: true
    },
    process: {
        type: DataTypes.ENUM('sell','rent'),
        required: true
    },
    owner: {
        type: DataTypes.STRING,
        required: true

    },
    price: {
        type: DataTypes.FLOAT,
        required: true
    },
    SurfaceArea: {
        type: DataTypes.FLOAT,
        required: true
    },
    landArea: {
        type: DataTypes.FLOAT,
        required: true
    },
    Floors: {
        type: DataTypes.INTEGER,
        required: true
    },
    buildingAge: {
        type: DataTypes.ENUM('Under-Construction','0-11 months','1-5 years','6-9 years','10-19 years','+20 years'),
        required: false
    },
    rooms: {
        type: DataTypes.ENUM('Studio','1-Bedroom', '2-Bedrooms','3-Bedrooms','4-Bedrooms','5-Bedrooms','+6-Bedrooms'),
        required: false,
    },
    bathRooms: {
        type: DataTypes.ENUM('1-Bathroom','2-Bathrooms','3-Bathrooms','4-Bathrooms','+5-Bathrooms'),
        required: false,
    },

    Avilability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    Furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        allowNull: false,
    },

    city: {
        type: DataTypes.ENUM("Amman","Zarqa","Irbid","Aqaba","Mafraq","Jarash","Ma'an","Karak","AL-Salt","Ajloun","Tafilah","al-Balqa"),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    MoreInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = housesModel;