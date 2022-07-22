'use strict';
const apartmentImagesModel = (sequelize, DataTypes) => 
sequelize.define('apartmentImages', {
    apartmentId: {
        type: DataTypes.INTEGER,
        required: true
    },
    type: {
        type: DataTypes.STRING,
        required: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    data: {
        type: DataTypes.BLOB("long"),
        required: true
    }
});
module.exports =apartmentImagesModel;
