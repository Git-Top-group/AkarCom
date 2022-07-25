'use strict';
const houseImagesModel = (sequelize, DataTypes) => 
sequelize.define('houseimages', {
    houseId: {
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
module.exports =houseImagesModel;