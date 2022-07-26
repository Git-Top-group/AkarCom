"use strict";
const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index.model");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");
const permissions = require("./middleware/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log(userRecord.token);
    const output = {
      user: userRecord,
      //token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
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

authRouter.get(
  "/all",
  bearerAuth,
  permissions("CRUD_Users"),
  async (req, res, next) => {
    const userRecords = await users.findAll({});
    const list = userRecords.map((user) => user.username);
    res.status(201).json(list);
  }
);

authRouter.get("/secret", bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area");
});

module.exports = authRouter;
