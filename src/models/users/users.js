'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    city: {
      type: DataTypes.ENUM("Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq", "Jarash", "Ma'an", "Karak", "Madaba", "Ajloun", "Tafilah", "Al-Balqa"),
      defaultValue: 'Amman'
    },
    dataOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.VIRTUAL,
      /*get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        //return token;
      }*/
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['CRUD'],
          admin: ['CRUD', 'CRUD_Users']
        };
        return acl[this.role];
      }
    }

  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let newToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: '60 min' });//reqire a new token in 15 min
      user.token = newToken;

      return user;
    }
    else {
      throw new Error("Invalid user");
    }
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      // user.token="Mohammad";
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

 
  return model;
}

module.exports = userModel;







