'use strict';
const ordersModel = (sequelize, DataTypes) =>
sequelize.define('orders',{
    clientId:{  //fk from users table
        type: DataTypes.INTEGER,
        // allowNull: true
    },
    ownerId:{   //not fk
        type: DataTypes.INTEGER,
        // allowNull: true
    },
    postId:{   //not fk
        type: DataTypes.INTEGER,
        // allowNull: true
    },
    model:{
        type:DataTypes.STRING,
        // allowNull: true
    }
})
module.exports = ordersModel;