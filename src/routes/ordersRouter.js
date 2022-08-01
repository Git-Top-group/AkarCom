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
ordersRouter.post("/:model/:postId/neworder", bearer, acl("CRUD"), async (req, res) => {
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
  if (ownerId === clientId) { // no order to my post! 
    res.send(`You are the owner of this ${model} post`)
  } else {

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


});
ordersRouter.get("/allorders", bearer, acl("CRUD_Users"), async (req, res) => {
  let allData = await orders.get();
  res.status(200).send(allData);
});
ordersRouter.get("/allorders/:postId", bearer, acl("CRUD_Users"),
  async (req, res) => {
    let postId = req.params.postId
    let oneData = await orders.getById(postId);
    res.status(200).send(oneData);
  }
);
ordersRouter.get("/allorders/:postId/:orderId", bearer, acl("CRUD_Users"),
  async (req, res) => {
    let postId = req.params.postId
    let orderId = parseInt(req.params.orderId);
    let oneData = await orders.getById(postId, orderId);
    res.status(200).send(oneData);
  }
);
//to send a message to owner
orderConnection.on("adminNewOrder", () => //(4)
  ordersRouter.post("/allorders/:postId/:orderId/:action", bearer, acl("CRUD_Users"), async (req, res) => {
    let action = req.params.action;
    let orderId = req.params.orderId;
    let postId = req.params.postId
    let message = req.body.message;
    if (action) {
      let order = await orders.getById(postId,orderId);
      orderConnection.emit("admin-response-after-new-order", {order:order,action:action}) //(5-b)
      if (action == "accept") {  
        orderConnection.emit("admin-to-owner", {message:`Admin >> We found a client for your order number ${orderId}, when will you be available to meet with him ?`,order:order}) //(5-b)
        res.status(200).send("Admin accepted the order and sent it to server");
        console.log("this will fire a (socket.emit) to the owner(socket.on) 🔥🔥🔥and  the project🔥🔥🔥")
        /*let data = await orders.findOne({ where: { id: orderId } });
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
          res.status(204).send("deleted");
        }
        return data;*/
      } else if (action === "reject") {
       // orderConnection.emit("admin-response-after-new-order", {orderId:orderId,action:action}) //(5-b)
        res.status(200).send("Admin rejected the order and sent it to server")
        // orders.destroy({ where: { id: orderId } })
      } else {
        let data = "there are no action ❌❌❌❌"
        return (data);
      }
    }
    // let data = await orders.orderAction(orderId, postId, action);
  }
  )
);
ordersRouter.get("/myorders/:userId", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  let allData = await orders.getMyOrders(req.user.id, userId);
  if(allData){
    res.status(200).send(allData);
  }else{
    res.status(200).send("You did not order any real estate.");
  }
}
)

ordersRouter.get("/myorders/:userId/:orderId", bearer, acl("CRUD"), async (req, res) => {
  let orderId = parseInt(req.params.orderId);
  let userId = parseInt(req.params.userId);
  let allData = await orders.getMyOrders(req.user.id, userId, orderId);
  if(allData){
    res.status(200).send(allData);
  }else{
    res.status(200).send("You did not order any real estate.");
  }}
)

orderConnection.on("client-response", (payload) => //(8-b)
ordersRouter.get("/myorders/:userId/:orderId/status", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  let orderId = parseInt(req.params.orderId);
  console.log("UUUUUUUUUUUUUU",orderId,payload.order);
  if(req.user.id !== userId || userId !== payload.order.clientId){
    res.status(200).send("Admin >> Please log in first.");
  }else
  if(orderId === payload.order.id){
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",payload);
    if(payload.action === 'reject'){
      let deleted = orders.removeRecord(payload.order.id);
      res.status(200).send("Admin >> We are sorry, but your order has been rejected from admin.")
    }else if(payload.action === 'accept'){
      res.status(200).send("Admin >> Your order has been accepted from admin, wait until the owner gives an appointment to meet.");
    }
  }else{
    res.status(200).send("Admin >> No response from admin yet.");
  }
}))

/*ordersRouter.get("/myorders/:userId/:orderId/status", bearer, acl("CRUD"), async (req, res) => {
  res.status(200).send("No response from admin yet.");
})*/

orderConnection.on("admin-to-owner-public", (payload) => //(8-b)
ordersRouter.get("/check/:userId", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  if(req.user.id == userId && userId == payload.order.ownerId){
    let date = new Date();
    orderConnection.emit("owner-to-admin", {message:`Let's meet on ${date} `,order:payload.order}) ;//(5-b)
    res.status(200).send(payload.message);
  }else{
    res.status(200).send("Admin >> There is no orders on your post yet.");
  }
  //let allData = await orders.getMyOrders(req.user.id, userId, orderId);
  //res.status(200).send(allData);
}
)
)

orderConnection.on("owner-to-admin-public", (payload) => //(8-b)
ordersRouter.get("/checkmeet", bearer, acl("CRUD_Users"), async (req, res) => {
    orderConnection.emit("admin-to-client-meet", {message:payload.message,order:payload.order}) ;//(5-b)
    res.status(200).send("Admin >> Meeting decided with client and owner.")
  //res.status(200).send(allData);
}
)
)

orderConnection.on("admin-to-client-meet-public", (payload) => //(8-b)
ordersRouter.get("/myorders/:userId/:orderId/status/date", bearer, acl("CRUD"), async (req, res) => {
  const userId = parseInt(req.params.userId);
  const orderId = parseInt(req.params.orderId);

  if(req.user.id === userId && userId === payload.order.clientId && orderId === payload.order.id){
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",payload);
      res.status(200).send(`Admin >> ${payload.message} `)
  }else{
    res.status(200).send("Admin >> Something wrong.");
  }
}))

//when user recive a socket from admin  : he will hit this route
/*ordersRouter.get("/check/:userId/:messageId/:action", bearer, acl("CRUD"), async (req, res) => {
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
ordersRouter.get("/check/:userId/:messageId", bearer, acl("CRUD"), async (req, res) => {
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
/*ordersRouter.get("/check/:userId", bearer, acl("CRUD"), async (req, res) => {
  let realId = req.user.id;
  let userId = req.params.userId;
  let respones = await messages.myMessages(realId, userId);

  if (respones) {
    res.status(200).send(respones);
  } else {
    res.status(200).send("no orders for now ");
  }
});*/

module.exports = ordersRouter;