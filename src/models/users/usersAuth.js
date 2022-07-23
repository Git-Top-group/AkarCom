'use strict';

require("dotenv").config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "any word";
const bcrypt = require('bcrypt');
const {users}=require("./index");


const authenticateBasic = async function (username, password) {

    const user = await users.findOne({ where: { username: username } })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, SECRET,{expiresIn : '15 min'});//reqire a new token in 15 min
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}

const authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    console.log('parsedToken >>>>>>>>>>>>>>>>>>', parsedToken);
    const user = await users.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
        return user;
    } else {
        throw new Error("Invalid Token");
    }
}



module.exports = {
    authenticateBasic:authenticateBasic,
    authenticateBearer:authenticateBearer,
};