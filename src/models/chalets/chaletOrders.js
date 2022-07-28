'use strict';
const chaletOrdersModel = (sequelize, DataTypes) =>
sequelize.define('chaletorders',{
    postId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ownerId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    customerId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    model:{
        type:DataTypes.STRING,
        allowNull: true
    }
})
module.exports = chaletOrdersModel;