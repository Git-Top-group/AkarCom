'use strict';
const warehousesModel = (sequelize, DataTypes) => 
sequelize.define('warehouses', {
  
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
    type: {
        type: DataTypes.ENUM('Industrial','Commercial','Agricultural'),
        defaultValue: 'Commercial',
    },
    owner: {
        type: DataTypes.ENUM('Owner','Broker'),
        defaultValue: 'Owner',

    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    area: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    availability : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    rentDuration: {
        type: DataTypes.ENUM("Daily","Weekly","Monthly","Yearly"),
        defaultValue: 'Monthly',
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
    },
    url2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url3: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = warehousesModel;