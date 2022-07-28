'use strict';
const landImagesModel = (sequelize, DataTypes) =>
    sequelize.define('landimages', {
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
module.exports = landImagesModel;