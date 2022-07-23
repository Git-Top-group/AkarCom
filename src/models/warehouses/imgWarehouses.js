'use strict';
const warehouseImagesModel = (sequelize, DataTypes) => 
sequelize.define('warehouseImages', {
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
module.exports =warehouseImagesModel ;