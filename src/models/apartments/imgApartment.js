'use strict';
const apartmentImagesModel = (sequelize, DataTypes) => 
sequelize.define('apartmentimages', {
    apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.BLOB("long"),
    }
});
module.exports =apartmentImagesModel;
