'use strict';
const landImagesModel = (sequelize, DataTypes) => 
sequelize.define('landImages', {
    warehouseId: {
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
module.exports =landImagesModel;