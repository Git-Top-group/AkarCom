"use strict";
const modelFolder = require("../models/index.model");
const express = require("express");
const routers = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

const { users } = require("../models/index.model")

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


//Create user Profile ✔✔✔
routers.post(
  "/Profile/:userId/:model",
  bearer,
  acl("CRUD"),
  async (req, res) => {
    let userId = parseInt(req.params.userId);
    let newModel = req.body;
    newModel.userId = req.params.userId;
    let newRecord = await req.model.createProfile(req.user.id, userId, newModel);
console.log("newRecord   ----------  ",this.model);
console.log("----------  ");
console.log("----------  ");
console.log("newModel   ----------  ",newModel);


    if (newRecord) {
      console.log("user id : ",userId,"","req.user.id : ",req.user.id);
      res.status(201).json(newRecord);
    } else {
      res
        .status(403)
        .send("the real user id  not matching the id that you sent by params, your need to update your info ");
    }
  }
);


// update user Profile
routers.put(
  "/Profile/:userId/update/:model",
  bearer,
  acl("CRUD"),
  async (req, res) => {

    const userId = parseInt(req.params.userId);
    let obj = req.body;
    let updatedModel = await req.model.updateProfile(req.user.id, userId, obj);
    if (updatedModel) {
      if (updatedModel[0] != 0) {
        res.status(201).json(updatedModel[1]);
      } else {
        res.status(403).send(`you cannot update profile}`);
      }
    } else {
      res.status(403).send(`You can not update profile of other users !!`);

    }
  }
);

// read user Profile
// routers.get("/Profile/:userId/:model", bearer, acl("CRUD"),async (req, res) => {
//   let userId = parseInt(req.params.userId);
//   let allProfiles = await req.model.getProfile(req.user.id, userId,req.user.role);
//   res.status(200).send(allProfiles);
// });

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


//to update users info
// routers.put(
//   "/profile/:userId/update",
//   bearer,
//   acl("CRUD"),
//   async (req, res) => {

//     const userId = parseInt(req.params.userId);

//     let obj = req.body;
//     let updatedModel = await req.users.updateProfile(req.user, userId, obj);
//     if (updatedModel) {

//       if (updatedModel[0] != 0) {
//         res.status(201).json(updatedModel[1]);
//       } else {
//         res.status(403).send(`you cannot update profile}`);
//       }
//     } else {
//       res.status(403).send(`You can not update profile of other users !!`);

//     }
//   }
// );
// routers.delete(
//   "/clear/:model/:postId",
//   bearer,
//   acl("CRUD_Users"),
//   async (req, res, next) => {

//     const postId = parseInt(req.params.postId);
//     try {
//       let deletedData = await req.model.clear(postId);
//       console.log(deletedData);
//       res.status(200).send("record deleted and the model is clean ");
//       return deletedData;
//     } catch (e) {
//       console.error("Error in deleting record in user ");
//     }

//   }
// );

routers.get('/null/:model/', async (req, res) => {
  let oneData = await req.model.getbyNull();
  res.status(200).send(oneData);
})
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

