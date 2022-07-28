'use strict';
const warehouseImagesModel = (sequelize, DataTypes) => 
sequelize.define('warehouseimages', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports =warehouseImagesModel ;