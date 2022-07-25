'use strict';
const villaImagesModel = (sequelize, DataTypes) =>
    sequelize.define('villaimages', {
        villaId: {
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
module.exports = villaImagesModel;