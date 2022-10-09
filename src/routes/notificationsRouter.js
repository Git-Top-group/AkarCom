"use strict";
require("dotenv").config();
const PORT = process.env.PORT;
const io = require("socket.io-client");
let host = `http://localhost:${PORT}`;

const modelFolder = require("../models/index.model");
const { notifications } = require("../models/index.model");

const express = require("express");
const notificationsRouter = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

// let date;
// let message;
// let orderRecord;
notificationsRouter.param("model", (req, res, next) => {
  if (modelFolder[req.params.model]) {
    req.model = modelFolder[req.params.model];
    next();
  } else {
    next("invalid input");
  }
});



notificationsRouter.get("/hello/orders/:userId/", bearer, acl("CRUD"), async (req, res) => {
    let userId = parseInt(req.params.userId);
    console.log(" line 31 notifications router  +++++++++")
    let allData = await   notifications.getMyOrders(req.user.id, userId);
    if(allData){
      res.status(200).send(allData);
    }else{
      res.status(200).send("You did not order any real estate.");
    }
  }
  )
  
  notificationsRouter.get("/myorders/:userId/:orderId", bearer, acl("CRUD"), async (req, res) => {
    let orderId = parseInt(req.params.orderId);
    let userId = parseInt(req.params.userId);
    let allData = await notifications.getMyOrders(req.user.id, userId, orderId);
    if(allData){
      res.status(200).send(allData);
    }else{
      res.status(200).send("You did not order any real estate.");
    }}
  )
  
  module.exports = notificationsRouter;