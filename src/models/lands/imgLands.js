'use strict';
const landImagesModel = (sequelize, DataTypes) => 
sequelize.define('landimages', {
    landId: {
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
module.exports =landImagesModel;