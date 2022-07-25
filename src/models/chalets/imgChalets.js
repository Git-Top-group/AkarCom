'use strict';
const chaletImagesModel = (sequelize, DataTypes) => 
sequelize.define('chaletimages', {
    chaletId: {
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
module.exports =chaletImagesModel;
