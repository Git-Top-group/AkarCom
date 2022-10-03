"use strict";

const { users } = require("../models/index.model");

const modelFolder = require("../models/index.model");
const express = require("express");
const adminRouters = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const basicAuth = require("../auth/middleware/basic");
const acl = require("../auth/middleware/acl.js");

adminRouters.param("model", (req, res, next) => {
  if (modelFolder[req.params.model]) {
    req.model = modelFolder[req.params.model];
    next();
  } else {
    next("invalid input");
  }
});
// sign in for admin (strech goal)
adminRouters.post("/admin/signin", basicAuth, (req, res, next) => {
  if (req.user.role === "admin") {
    const user = {
      user: req.user,
      //token: req.user.token
    };

    res.status(200).json(user);
  } else {
    res.status(403).send(" invalid sign/in , you are not an admin ");
  }
});
// admin can access any post for any user and delete it 
adminRouters.delete("/:model/:userId/:postId", bearer, acl("CRUD_Users"), async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  let deletedModel = await req.model.removeRecord(
    req.user.id,
    userId,
    postId,
    req.user.role
  );
  if (deletedModel) {
    res.send("Deleted Successfully");
    res.status(204);
  } else {
    res.status(403).send(`You can not delete posts of other users !!`);
  }
}

)
//admin can check all users(all data from users table )
adminRouters.get("/users", bearer, acl("CRUD_Users"), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map((user) => user);
  res.status(201).json(list);
}
);
adminRouters.get("/users/:id", bearer, acl("CRUD_Users"), async (req, res, next) => {
  let id = parseInt(req.params.id);
  const userRecords = await users.findOne({ where: { id } });
  res.status(201).json(userRecords);
}
);

module.exports = adminRouters;