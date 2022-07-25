'use strict';
const userImagesModel = (sequelize, DataTypes) => 
sequelize.define('userimages', {
    userId: {
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
module.exports =userImagesModel;