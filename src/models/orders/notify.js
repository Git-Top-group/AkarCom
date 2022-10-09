'use strict';
const notifyModel = (sequelize, DataTypes) =>
sequelize.define('notifications',{
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
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: 'pending',

    }
})
module.exports = notifyModel;