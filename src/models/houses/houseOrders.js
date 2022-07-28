'use strict';
const houseOrdersModel = (sequelize, DataTypes) =>
sequelize.define('houseorders',{
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
module.exports = houseOrdersModel;