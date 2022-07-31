'use strict';
const messagesModel = (sequelize, DataTypes) =>
sequelize.define('messages',{
    orderId:{  //fk from users table
        type: DataTypes.INTEGER
    },
    messageBody:{   //not fk
        type: DataTypes.STRING
    },
    postId:{   //not fk
        type: DataTypes.INTEGER
    },
    userId:{   //not fk
        type: DataTypes.INTEGER
    },
    model:{
        type:DataTypes.STRING
    }
})
module.exports = messagesModel;