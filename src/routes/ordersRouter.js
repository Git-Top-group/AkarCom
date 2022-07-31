"use strict";
require("dotenv").config();
const PORT = process.env.PORT;
const io = require("socket.io-client");
let host = `http://localhost:${PORT}`;
const orderConnection = io.connect(host);

const modelFolder = require("../models/index.model");
const { orders, messages } = require("../models/index.model");

const express = require("express");
const ordersRouter = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

ordersRouter.param("model", (req, res, next) => {
  if (modelFolder[req.params.model]) {
    req.model = modelFolder[req.params.model];
    next();
  } else {
    next("invalid input");
  }
});

// make an order
ordersRouter.post(
  "/neworder/:model/:postId",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    let model = req.params.model;

    let postId = parseInt(req.params.postId);
    let clientId = parseInt(req.user.id);
    let postData = await req.model.action(postId);
    console.log("postData: " + postData);
    let ownerId = postData.userId;
    let newOrder = {
      clientId,
      ownerId,
      postId,
      model,
    };

    let orderRecord = await orders.createOrder(newOrder);
    let orderId = orderRecord.id;
    console.log({ newOrder });
    let Order = {
      event: "new-order",
      orderId: orderId,
      time: new Date().toLocaleString(),
      newOrder,
    };

    orderConnection.emit("new-order", Order); //(1)
    res.status(200).send("Order has been sent, admin will contact soon");
  }
);

ordersRouter.get("/allorders", bearer, acl("CRUD_Users"), async (req, res) => {
  let allData = await orders.get();
  res.status(200).send(allData);
});
ordersRouter.get(
  "/allorders/:postId",
  bearer,
  acl("CRUD_Users"),
  async (req, res) => {
    let postId =req.params.postId
    let oneData = await orders.getById(postId);
    res.status(200).send(oneData);
  }
);

ordersRouter.get(
  "/allorders/:postId/:orderId",
  bearer,
  acl("CRUD_Users"),
  async (req, res) => {
    let postId =req.params.postId
    let orderId = parseInt(req.params.orderId);
    let oneData = await orders.getById(postId,orderId);
    res.status(200).send(oneData);
  }
  );
  

//to send a message to owner
ordersRouter.post(
  "/allorders/:postId/:orderId/:action",
  bearer,
  acl("CRUD_Users"),
  async (req, res) => {
    let action = req.params.action;
    let orderId = req.params.orderId;
    let postId =req.params.postId

    let message = req.body.message;
    let data = await orders.getOrder(orderId,postId, action);
    if (data) {
      let obj = {
        orderId: orderId,
        postId: data.postId,
        userId: data.ownerId,
        model: data.model,
        messageBody: message,
      };
      let usermessage = await messages.createMessage(obj);

      res.status(200).send(usermessage);
    } else {
      res.status(200).send("there in no orders , or error in postId");
    }
  }
);

//when user recive a socket from admin  : he will hit this route

ordersRouter.get(
  "/check/:userId/:messageId/:action",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    // bearer,
    let realId = req.user.id;
    let userId = req.params.userId;
    let messageId = req.params.messageId;

    let action = req.params.action;

    let respones = await messages.myMessages(realId, userId, messageId, action);

    if (respones) {
      res.status(200).send(respones);
    } else {
      res.status(200).send("no orders for now ");
    }
  }
);
ordersRouter.get(
  "/check/:userId/:messageId",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    // bearer,
    let realId = req.user.id;
    let userId = req.params.userId;
    let messageId = req.params.messageId;
    let respones = await messages.myMessages(realId, userId, messageId);

    if (respones) {
      res.status(200).send(respones);
    } else {
      res.status(200).send("no orders for now ");
    }
  }
);
ordersRouter.get("/check/:userId", bearer, acl("CRUD"), async (req, res) => {
  // bearer,
  let realId = req.user.id;
  let userId = req.params.userId;
  let respones = await messages.myMessages(realId, userId);

  if (respones) {
    res.status(200).send(respones);
  } else {
    res.status(200).send("no orders for now ");
  }
});

module.exports = ordersRouter;
