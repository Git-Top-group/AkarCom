'use strict';
const apartmentOrdersModel = (sequelize, DataTypes) =>
sequelize.define('apartmentorders',{
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
module.exports = apartmentOrdersModel;