'use strict';
const warehousesModel = (sequelize, DataTypes) => 
sequelize.define('warehouses', {
    warehouseId: {
        type: DataTypes.INTEGER,
        required: true
    },
    userId: {
        type: DataTypes.INTEGER,
        required: true
    },
    process: {
        type: DataTypes.ENUM('sell','rent'),
        required: true
    },
    type: {
        type: DataTypes.ENUM('industrial','commercial','agricultural'),
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
    area: {
        type: DataTypes.FLOAT,
        required: true
    },

    Avilability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    rentDuration: {
        type: DataTypes.ENUM("daily","weekly","monthly","yearly"),
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

module.exports = warehousesModel;