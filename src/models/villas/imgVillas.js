'use strict';
const villaImagesModel = (sequelize, DataTypes) =>
    sequelize.define('villaImages', {
        villaId: {
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
module.exports = villaImagesModel;