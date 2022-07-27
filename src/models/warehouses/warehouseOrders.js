'use strict';
const warehouseOrdersModel = (sequelize, DataTypes) =>
sequelize.define('warehouseorders',{
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
module.exports = warehouseOrdersModel;