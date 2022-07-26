'use strict';
const modelFolder = require('../models/index.model');
const express = require('express');
const routers = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");

routers.param("model", (req, res, next) => {
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
})


//Get specific model posts (visitor)
routers.get('/:model', async (req, res) => {
    let allData = await req.model.get();
    res.status(200).send(allData);
})
//Get specific model posts (user)
routers.get('/:userId/:model', async (req, res) => {
    let allData = await req.model.get();
    res.status(200).send(allData);
})
routers.get('/:userId/:model/:postId', async (req, res) => {
    let postId = parseInt(req.params.postId)
    let allData = await req.model.getById(postId);
    res.status(200).send(allData);
})

//Create posts 
routers.post('/:userId/newpost/:model', bearer, acl('CRUD'), async (req, res) => {
    let userId = parseInt(req.params.userId);
    let newModel = req.body;

    let model = await req.model.createRecord(req.user.id, userId, newModel);
    if (model) {
        res.status(201).json(model);

    } else {
        res.status(403).send('the real user id  not matching the id that you sent by params ');
    }
})

//Update posts
routers.put('/:userId/dashboard/:model/:postId', bearer, acl('CRUD'), async (req, res) => {
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
    }
    else {

        res.status(403).send(`You can not update posts of other users !!`);
    }
})


routers.delete('/:userId/dashboard/:model/:postId', bearer, acl('CRUD'), async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let deletedModel = await req.model.removeRecord(req.user.id, userId, postId);

    if (deletedModel) {
        res.send("Deleted Successfully");
        res.status(204);
    }
    else {

        res.status(403).send(`You can not delete posts of other users !!`);
    }

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