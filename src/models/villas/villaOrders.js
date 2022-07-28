'use strict';
const villaOrdersModel = (sequelize, DataTypes) =>
sequelize.define('villaorders',{
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
module.exports = villaOrdersModel;