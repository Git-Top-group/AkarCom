'use strict';
const landImagesModel = (sequelize, DataTypes) =>
    sequelize.define('landimages', {
        postId: {
            type: DataTypes.INTEGER,
            unique:true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        url1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        url3: {
            type: DataTypes.STRING,
            allowNull: true
        },url4: {
            type: DataTypes.STRING,
            allowNull: true
        },url5: {
            type: DataTypes.STRING,
            allowNull: true
        },url6: {
            type: DataTypes.STRING,
            allowNull: true
        },url7: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
module.exports = landImagesModel;