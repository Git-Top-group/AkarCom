"use strict";
const modelFolder = require("../models/index.model");
const express = require("express");
const routers = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");
// const {dbImages}= require("../models/index.model");

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
// ✔✔✔✔✔✔ this will allows user to see all his posts in dashboard for specific model (step 1)
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

//Create posts ✔✔✔
routers.post(
  "/newpost/:userId/:model",
  bearer,
  acl("CRUD"),
  async (req, res) => {

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

routers.post(
  "/newpost/:userId/:model/:postId/:modelImages",
  bearer,
  acl("CRUD"),
  async (req, res) => {

    let userId = parseInt(req.params.userId);
    let newModel = req.body;
    let postId = parseInt(req.params.postId);
    newModel.postId = postId;

    let model = await req.modelImages.create(newModel);

    if (model) {
      model.postId = postId;
      model.model = req.params.model;
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


//delete posts : (step 3)
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



//Filter one or more at the same time (visitor)
routers.get('/:model/:process/:city/:owner/:availability/:buildingAge/:furnished/:rooms/:bathRooms/:rentDuration/:floors/:priceFrom/:priceTo', async (req, res) => {
  const process = req.params.process;
  const city = req.params.city;
  const owner = req.params.owner;
  const availability = req.params.availability;
  const buildingAge = req.params.buildingAge;
  const furnished = req.params.furnished;
  const rooms = req.params.rooms;
  const bathRooms = req.params.bathRooms;
  const rentDuration = req.params.rentDuration;
  const floors = req.params.floors;
  const priceFrom = req.params.priceFrom;
  const priceTo = req.params.priceTo;


  let filteredData = await req.model.readFiltered(process, city, owner, availability, buildingAge, furnished, rooms, bathRooms, rentDuration, floors, priceFrom, priceTo);
  if (filteredData) {
    res.status(200).send(filteredData);
  } else {
    res.status(403).send(`Error: your filteration does not match any existing data`);
  }

})

module.exports = routers;

