'use strict';
const villaImagesModel = (sequelize, DataTypes) =>
    sequelize.define('villaimages', {
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
module.exports = villaImagesModel;