'use strict';
const apartmentImagesModel = (sequelize, DataTypes) =>
    sequelize.define('apartmentimages', {
        postId: {
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
module.exports = apartmentImagesModel;
