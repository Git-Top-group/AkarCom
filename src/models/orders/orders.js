'use strict';
const ordersModel = (sequelize, DataTypes) =>
sequelize.define('orders',{
    clientId:{  //fk from users table
        type: DataTypes.INTEGER
    },
    ownerId:{   //not fk
        type: DataTypes.INTEGER
    },
    postId:{   //not fk
        type: DataTypes.INTEGER
    },
    model:{
        type:DataTypes.STRING
    }
})
module.exports = ordersModel;