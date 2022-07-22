'use strict';
const houseImagesModel = (sequelize, DataTypes) => 
sequelize.define('houseImages', {
    houseId: {
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
module.exports =houseImagesModel;