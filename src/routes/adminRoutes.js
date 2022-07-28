"use strict";

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

adminRouters.delete(
  "/:model/:userId/:postId",
  bearer,
  acl("CRUD_Users"),
  async (req, res) => {
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
adminRouters.delete(
  "/clear/:model",
  bearer,
  acl("CRUD_Users"),
  async (req, res) => {
    

    const postId = parseInt(req.params.postId);
    
    let deletedModel = await req.model.clear(
     
     
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
adminRouters.get("/orders")
adminRouters.get("/orders/:orderId")



module.exports = adminRouters;