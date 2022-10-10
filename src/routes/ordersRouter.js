"use strict";
require("dotenv").config();
const PORT = process.env.PORT;
const io = require("socket.io-client");
const { faker } =require('@faker-js/faker');
let host = `http://localhost:${PORT}`;
const orderConnection = io.connect(host);

const modelFolder = require("../models/index.model");
const { orders, notifications} = require("../models/index.model");

const express = require("express");
const ordersRouter = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

let date;
let message;
let orderRecord;
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

    orderRecord = await orders.createOrder(newOrder);
  let notificationsRecord = await notifications.createOrder(newOrder);
console.log("------------------------------------------------")
console.log(notificationsRecord)
console.log("------------------------------------------------")

    // let orderId = orderRecord.id;

    // console.log({ newOrder });
    // let event= "new-order";
    // let Order = {
    //   event: "new-order",
    //   orderId: orderId,
    //   time: new Date().toLocaleString(),
    //   newOrder,
    // };

    // orderConnection.emit("new-order", {order:orderRecord,event:event}); //(1)
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
// orderConnection.on("adminNewOrder", (payload) => //(4)
//   ordersRouter.post("/allorders/:postId/:orderId/:action", bearer, acl("CRUD_Users"), async (req, res) => {
//     let action = req.params.action;
//     let orderId = req.params.orderId;
//     let postId = req.params.postId
//     payload.event='admin-new-order';
//    // let message = req.body.message;
//     if (action) {
//       console.log("line 100 ++++++++")
//       orderConnection.emit("admin-response-after-new-order", {order:payload.order,action:action,event:payload.event}) //(5)
//       if (action == "accept") {  
//         console.log("line 103 ++++++++")
    
//         // let status = "Accepted"
//         let updated = await notifications.update2(orderId ,action)
//         if (updated) {
//           console.log(updated);

//           res.status(200).send("Admin accepted the order.");

//         }else{
//         res.status(403).send("you can't update ");
//       }
//         date = faker.date.future();
//         message=`Admin >> We found a client for your order number ${orderId}, will you be available to meet him on ${date} ?`;
//         orderConnection.emit("admin-to-owner", {order:payload.order,message:message,event:payload.event,date:date}) //(9)
//         console.log("this will fire a (socket.emit) to the owner(socket.on) 🔥🔥🔥and  the project🔥🔥🔥")
//         /*let data = await orders.findOne({ where: { id: orderId } });
//         if (data) {
//           let obj = {
//             orderId: orderId,
//             postId: data.postId,
//             userId: data.ownerId,
//             model: data.model,
//             messageBody: message,
//           };
//           let usermessage = await messages.createMessage(obj);
//           res.status(200).send(usermessage);
//         } else {
//           res.status(204).send("deleted");
//         }
//         return data;*/
//       } else if (action === "reject") {
//         let updated = await notifications.update2(orderId ,action)
//         if (updated) {
//           console.log(updated);

//         res.status(200).send("Admin rejected the order.")
          
//         }else{
//         res.status(403).send("you can't update other users profiles");
//       }

//        // orderConnection.emit("admin-response-after-new-order", {orderId:orderId,action:action}) //(5-b)
//         // orders.destroy({ where: { id: orderId } })
//       } else {
//         let data = "there are no actions ❌❌❌❌"
//         return (data);
//       }
//     }
//     // let data = await orders.orderAction(orderId, postId, action);
//   }
//   )
// );

ordersRouter.post("/allorders/:postId/:orderId/:action", async (req, res) => {
  let action = req.params.action;
  let orderId = req.params.orderId;
  let postId = req.params.postId
 // let message = req.body.message;
  if (action) {
    console.log("line 100 ++++++++")
    if (action == "accept") {  
      console.log("line 103 ++++++++")
  
      // let status = "Accepted"
      let updated = await notifications.update2(orderId ,action)
      if (updated) {
        console.log(updated);

        res.status(200).send("Admin accepted the order.");

      }else{
      res.status(403).send("you can't update ");
    }
      
    } else if (action === "reject") {
      let updated = await notifications.update2(orderId ,action)
      if (updated) {
        console.log(updated);

      res.status(200).send("Admin rejected the order.")
        
      }else{
      res.status(403).send("you can't update other users profiles");
    }

    } else {
      let data = "there are no actions ❌❌❌❌"
      return (data);
    }
  }
}
)



ordersRouter.get("/myorders/:userId", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  console.log("line 37 orderRouter ++++++++++++++++++++++")
  console.log("line 37 orderRouter ++++++++++++++++++++++")

  let allData = await notifications.getMyOrders(req.user.id, userId);
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
  let allData = await notifications.getMyOrders(req.user.id, userId, orderId);
  if(allData){
    res.status(200).send(allData);
  }else{
    res.status(200).send("You did not order any real estate.");
  }}
)
ordersRouter.delete("/myorders/:userId/:orderId", bearer, acl("CRUD"), async (req, res) => {
  let orderId = parseInt(req.params.orderId);
  let userId = parseInt(req.params.userId);
  let allData = await notifications.delete2( orderId);
  if(allData){
    res.status(204).send("order deleted successfully");
  }else{
    res.status(403).send("Your order hasn't deleted .");
  }}
)

orderConnection.on("client-response", (payload) => //(8)
ordersRouter.get("/myorders/:userId/:orderId/status", bearer, acl("CRUD"), async (req, res) => {
  payload.event='client-response';
  let userId = parseInt(req.params.userId);
  let orderId = parseInt(req.params.orderId);
  if(req.user.id !== userId || userId !== payload.order.clientId){
    res.status(200).send("Admin >> Please log in first.");
  }else
  if(orderId === payload.order.id){
    if(payload.action === 'reject'){
      let deleted = orders.removeRecord(payload.order.id);
      res.status(200).send("Admin >> We are sorry, but your order has been rejected from admin.")
    }else if(payload.action === 'accept'){
      res.status(200).send("Admin >> Your order has been accepted from admin, wait until we schedule a meeting with owner.");
    }
  }else{
    res.status(200).send("Admin >> No response from admin yet.");
  }
}))

/*ordersRouter.get("/myorders/:userId/:orderId/status", bearer, acl("CRUD"), async (req, res) => {
  res.status(200).send("No response from admin yet.");
})*/

orderConnection.on("admin-to-owner-public", (payload) => //(12)
ordersRouter.get("/check/:userId/:action", bearer, acl("CRUD"), async (req, res) => { 
  payload.event='admin-to-owner-public';
  let userId = parseInt(req.params.userId);
  let action = 'action';
  if(req.params.action){
    action=req.params.action;
  }
  if(req.user.id == userId && userId == payload.order.ownerId){
    //let date = faker.date.future();
    if(action==='action'){
      res.status(200).send(message);
    }else if(action==='accept'){
      message=`Admin >> We will check if client has no problems with this date and contact you if we need to change the date. `;
      orderConnection.emit("owner-to-admin", {order:payload.order,message:message,event:payload.event,date:payload.date}) ;//(13-a)
      res.status(200).send(message);
    }else if(action==='reject'){
      message=`Can you please give me another date ? `;
      orderConnection.emit("owner-to-admin-reject", {order:payload.order,message:message,event:payload.event}) ;//(13-b)
      res.status(200).send("Admin >> Wait until admin schedule a new date for you and client to meet.");
    }
   // payload.message=`Let's meet on ${date} `;
   // res.status(200).send(payload.message);
  }else{
    res.status(200).send("Admin >> There is no orders on your post yet.");
  }
  //let allData = await orders.getMyOrders(req.user.id, userId, orderId);
  //res.status(200).send(allData);
}
)
)

orderConnection.on("owner-to-admin-public", (payload) => //(16-a)
ordersRouter.get("/checkmeet/owner/accepted", bearer, acl("CRUD_Users"), async (req, res) => {
  payload.event='owner-to-admin-public';
    //message=`Let's meet on ${date}, please be at our office in time.`;
    message=`Admin >> Owner wants to meet at ${date}, is it okay with you ?`
    orderConnection.emit("admin-to-client-meet", {order:payload.order,message:message,event:payload.event}) ;//(17-a)
    res.status(200).send(`Admin >> check if client has no problems with this date ${date}`)
  //res.status(200).send(allData);
}
)
)

orderConnection.on("owner-to-admin-reject-public", (payload) => //(16-b)
ordersRouter.get("/checkmeet/owner/rejected", bearer, acl("CRUD_Users"), async (req, res) => {
  payload.event='owner-to-admin-reject-public';
    date = faker.date.future();
    message=``;
    orderConnection.emit("admin-to-owner", {order:payload.order,message:message,event:payload.event,date:date}) ;//(17-b) backpoint 
    res.status(200).send("Admin >> Trying to schedule another meeting (A new date has been sent to the owner).")
  //res.status(200).send(allData);
}
)
)

// orderConnection.on("admin-to-client-meet-public", (payload) => //(20-a)
// ordersRouter.get("/myorders/:userId/:orderId/status/date/:action", bearer, acl("CRUD"), async (req, res) => {
//   let action = 'action';
//   payload.event='admin-to-client-meet-public';
//   const userId = parseInt(req.params.userId);
//   const orderId = parseInt(req.params.orderId);

//   if(req.params.action){
//     action=req.params.action;
//   }
//   if(req.user.id == userId && userId == payload.order.clientId){
//     if(action==='action'){
//       res.status(200).send(message);
//     }else if(action==='accept'){
//       message=`The meeting is scheduled. `;
//       orderConnection.emit("client-to-admin", {order:payload.order,message:message,event:payload.event,date:payload.date}) ;//(21-a-1)
//       res.status(200).send(`Meeting is scheduled, please be at our office on ${date} .`);
//     }else if(action==='reject'){
//       //message=`Can you please try to give me another date ? `;
//       orderConnection.emit("client-to-admin-reject", {order:payload.order,message:message,event:payload.event}) ;//(21-a-2)
//       res.status(200).send("Admin >> Wait until admin schedule a new date for you and owner to meet.");
//     }
//   }else{
//     res.status(200).send("Admin >> There is no orders on your post yet.");
//   }
// }))

//copy 
ordersRouter.get("/myorders/:userId/:orderId/date/:action", bearer, acl("CRUD"), async (req, res) => {
  let action = 'action';
  const userId = parseInt(req.params.userId);
  const orderId = parseInt(req.params.orderId);
let message ="we are waiting your acceptance  "
  if(req.params.action){
    action=req.params.action;
  }
  if(req.user.id == userId ){
    if(action==='action'){
      
      res.status(200).send(message);
    }else if(action==='accept'){
      message=`The meeting is scheduled. `;
      res.status(200).send(`Meeting is scheduled, please be at our office  .`);
    }else if(action==='reject'){
      //message=`Can you please try to give me another date ? `;
      res.status(200).send("Admin >> Wait until admin schedule a new date for you and owner to meet.");
    }
  }else{
    res.status(200).send("Admin >> There is no orders on your post yet.");
  }
})


orderConnection.on("client-to-admin-public", (payload) => //(24-a-1)
ordersRouter.get("/checkmeet/client/accepted", bearer, acl("CRUD_Users"), async (req, res) => {
  payload.event='client-to-admin-public';
    message=`Meeting has been scheduled with client and owner, let's meet on ${date}.`;
    res.status(200).send(message)
  //res.status(200).send(allData);
}
)
)

orderConnection.on("client-to-admin-reject-public", (payload) => //(24-a-2)
ordersRouter.get("/checkmeet/client/rejected", bearer, acl("CRUD_Users"), async (req, res) => {
  payload.event='client-to-admin-reject-public';
    date = faker.date.future();
    message=`Unfortunately, client is very busy at previous date, will you be available to meet the client on ${date} ?`;
    orderConnection.emit("admin-to-owner", {order:payload.order,message:message,event:payload.event,date:date}) ;//(24-a-2) //check event!
    res.status(200).send("Admin >> Trying to schedule another meeting (A new date has been sent to the owner).")
  //res.status(200).send(allData);
}
)
)

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