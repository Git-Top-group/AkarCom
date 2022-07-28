'use strict';
const chaletImagesModel = (sequelize, DataTypes) =>
    sequelize.define('chaletimages', {
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
module.exports = chaletImagesModel;
