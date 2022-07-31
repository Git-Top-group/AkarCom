"use strict";
const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index.model");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");
const permissions = require("./middleware/acl.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstring';

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log(userRecord.token);
    const output = {
      user: userRecord,
      // token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});
// authRouter.post("/userprofile/update/:userId",bearerAuth, async (req, res, next) => {
//   try {
//     let userRecord = await users.findOne({where :{id: req.params.userId}});
//     const output =req.body;
//     req.user.username = req.body.username;
//     console.log("❤🔥🔥❤🔥❤");
//     // const output = {
//     //   user: userRecord,
//     //   //token: userRecord.token
//     // };
//     let updated =await users.update(req.body.username);
//     console.log(userRecord);
//     console.log(userRecord.username);
//     res.status(201).json(updated);
//   } catch (e) {
//     next(e.message);
//   }
// });
authRouter.put("/profile/:userId/update", bearerAuth,
  async (req, res) => {
    let updated = null;
    const userId = parseInt(req.params.userId);
    // const postId = parseInt(req.params.postId);
    let obj = req.body;
    let realId = req.user.id
    // let updatedModel = await users.update(req.user.id, userId,  obj);
    if (realId = userId) {
      try {
        updated = await users.update(obj, {
          where: { id: userId },
          returning: true,
        });
        res.status(201).json(updated);
        return updated;

      } catch (e) {
        console.error("Error in updating record in model ");
      }
    }
  });

authRouter.post("/signin", basicAuth, (req, res, next) => {
  console.log(req.user.token);

  const user = {
    user: req.user,
    //token: req.user.token
  };

  res.status(200).json(user);
});

authRouter.delete("/delete/:username", bearerAuth, permissions("CRUD_Users"), async (req, res, next) => {
  let username = req.params.username;
  try {
    let deleted = await users.destroy({ where: { username: username } });
    res.status(204).send("user deleted");
    return deleted;
  } catch (e) {
    console.error("Error in deleting record in user ", username);

  }
}
);

authRouter.get("/secret", bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area");
});

module.exports = authRouter;
