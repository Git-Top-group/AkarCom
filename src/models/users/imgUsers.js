'use strict';
const userImagesModel = (sequelize, DataTypes) => 
sequelize.define('userImages', {
    userId: {
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
module.exports =userImagesModel;