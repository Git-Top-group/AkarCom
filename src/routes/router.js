"use strict";
require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io-client');
let host = `http://localhost:${PORT}`;
// const orderConnection = io.connect(host);

const modelFolder = require("../models/index.model");
const { orders, users } = require("../models/index.model");

const express = require("express");
const routers = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

routers.param("model", (req, res, next) => {
  if (modelFolder[req.params.model]) {
    req.model = modelFolder[req.params.model];
    next();
  } else {
    next("invalid input");
  }
});
routers.param("modelImages", (req, res, next) => {
  if (modelFolder[req.params.modelImages]) {
    req.modelImages = modelFolder[req.params.modelImages];
    next();
  } else {
    next("invalid input");
  }
});
routers.get("/dashboard/:userId/main", bearer, async (req, res) => {
  if (req.user.id == req.params.userId) {
    res.status(200).send("welcome to your dashboard");
  } else res.status(404).send("you are noy allowed");
});
//this will allows user to see all his posts in dashboard for specific model 
routers.get("/dashboard/:userId/:model", bearer, async (req, res) => {
  let model = req.params.model;

  let userId = parseInt(req.params.userId);
  let allData = await req.model.getMyposts(req.user.id, userId, model);
  res.status(200).send(allData);
});
routers.get("/dashboard/:userId/:model/:postId", bearer, async (req, res) => {
  let model = req.params.model;
  let postId = parseInt(req.params.postId);
  let userId = parseInt(req.params.userId);
  let allData = await req.model.getMyposts(req.user.id, userId, model, postId);
  res.status(200).send(allData);
});
//Get specific post images
routers.get("/dashboard/:userId/:model/:postId/:modelImages", bearer, async (req, res) => {
  let model = req.params.model;
  let userId = parseInt(req.params.userId);
  let postId = parseInt(req.params.postId);
  try {
    let allData = await req.modelImages.getPostImages(req.user.id, userId, model, postId);
    if (allData) {
      res.status(200).send(allData);
    } else {
      res
        .status(200)
        .send("Please provide your adv. with photos to get more clients or make sure you giving correct post id");
    }
  } catch {
    res
      .status(403)
      .send("the real user id  not matching the id that you sent by params ");
  }
});
//Get specific post (specific image) no need we can get images from postid and model because postid is unique
/*routers.get("/dashboard/:userId/:model/:postId/:modelImages/:imageId", bearer, async (req, res) => {
  let postId = parseInt(req.params.postId);
  let imageId = parseInt(req.params.imageId);
  let userId = parseInt(req.params.userId);
  let model = req.params.model;
  try {
    let allData = await req.modelImages.getPostImages(req.user.id, userId, model, postId, imageId);
    if (allData) {
      res.status(200).send(allData);
    } else {
      res
        .status(200)
        .send("Please provide your adv. with photos to get more clients. ");
    }
  } catch {
    res
      .status(403)
      .send("the real user id  not matching the id that you sent by params ");
  }
});*/
//Create posts ✔✔✔
routers.post("/newpost/:userId/:model", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  let newModel = req.body;
  newModel.model = req.params.model;

  let model = await req.model.createRecord(req.user.id, userId, newModel);
  if (model) {
    res.status(201).json(model);
  } else {
    res
      .status(403)
      .send("the real user id  not matching the id that you sent by params ");
  }
}
);
// create post images
routers.post("/newpost/:userId/:model/:postId/:modelImages", bearer, acl("CRUD"), async (req, res) => {
  let userId = parseInt(req.params.userId);
  let newModel = req.body;
  let postId = parseInt(req.params.postId);
  let model = await req.modelImages.createImage(req.user.id, userId, postId, newModel, req.params.model);
  if (model) {
    res.status(201).json(model);
  } else {
    res
      .status(403)
      .send("the real user id  not matching the id that you sent by params ");
  }
}
);



//Update posts : (step 3)
routers.put(
  "/dashboard/:userId/:model/:postId",
  bearer,
  acl("CRUD"),
  async (req, res) => {

    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let obj = req.body;
    let updatedModel = await req.model.update(req.user.id, userId, postId, obj);
    if (updatedModel) {

      if (updatedModel[0] != 0) {
        res.status(201).json(updatedModel[1]);
      } else {
        res.status(403).send(`There is no model with this id: ${id}`);
      }
  
  } else {
    res.status(403).send(`You can not update posts of other users !!`);
  }
}
);





//Update post images : (step 3)
routers.put(
  "/dashboard/:userId/:model/:postId/:modelImages",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    const model = req.params.model;
    let obj = req.body;
    obj.model = req.params.model;
    let updatedModel = await req.modelImages.updateImage(req.user.id, userId, postId, obj,model);
    if (updatedModel) {
      if (updatedModel[0] != 0) {
        res.status(201).json(updatedModel[1]);
      } else {
        res.status(403).send(`You don't have post with id: ${postId}`);
      }
    } else {
      res.status(403).send(`You can not update posts of other users !!`);

    }
  }
);
//delete posts 
routers.delete(
  "/dashboard/:userId/:model/:postId",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let deletedModel = await req.model.removeRecord(
      req.user.id,
      userId,
      postId
    );
    if (deletedModel) {
      res.send("Deleted Successfully");
      res.status(204);
    } else {
      res.status(403).send(`You can not delete posts of other users !!`);

    }
  }
);
//delete post images 
routers.delete(
  "/dashboard/:userId/:model/:postId/:modelImages",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    const model = req.params.model;
    let deletedModel = await req.modelImages.deleteImage(
      req.user.id, userId, postId, model
    );
    if (deletedModel) {
      res.status(204);
      res.send("Deleted Successfully");
    } else {
      res.status(403).send(`You can not delete posts of other users !!`);

    }
  }
);

routers.get('/null/:model/', async (req, res) => {
  let oneData = await req.model.getbyNull();
  res.status(200).send(oneData);
});

//user can update his own information
routers.put("/updateuser/:userId", bearer, acl("CRUD"), async (req, res) => { //do not change password!
  const userId = parseInt(req.params.userId);
  const realId = parseInt(req.user.id);
  let record = await users.findOne({ where: { id: userId } });
  if (record) {
    if (realId === userId || req.user.role == "admin") {
      try {
        let updatedUser = await record.update(req.body);
        res.status(201).json(updatedUser);
      } catch (e) {
        res.send(e.message);
      }
    } else {
      res.status(403).send(`You can not update other users information`);
    }
  }
}

);
module.exports = routers;

