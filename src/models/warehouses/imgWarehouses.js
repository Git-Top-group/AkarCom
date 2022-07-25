'use strict';
const warehouseImagesModel = (sequelize, DataTypes) => 
sequelize.define('warehouseimages', {
    warehouseId: {
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
module.exports =warehouseImagesModel ;