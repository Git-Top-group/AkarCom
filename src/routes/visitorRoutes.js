'use strict';
const modelFolder = require('../models/index.model');
const express = require('express');
const visitorRouters = express.Router();
const bearer =require("../auth/middleware/bearer")
const {Op} =require("sequelize")
visitorRouters.param("model", (req, res, next) => {
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
})

visitorRouters.param("modelImages", (req, res, next) => {
    if (modelFolder[req.params.modelImages]) {
        req.modelImages = modelFolder[req.params.modelImages];
        next();
    } else {
        next("invalid input");
    }
});
// Get specific model posts (visitor)
visitorRouters.get('/:model', async (req, res) => {
    let allData = await req.model.get();
    res.status(200).send(allData);
})
//Get specific post (visitor)
visitorRouters.get('/:model/:postId', async (req, res) => {
    let postId = parseInt(req.params.postId)
    let oneData = await req.model.getById(postId);
    res.status(200).send(oneData);
})
//Get specific post images (visitor)
visitorRouters.get('/:model/:postId/:modelImages', async (req, res) => {
    let postId = parseInt(req.params.postId)
    const model = req.params.model;
    let oneData = await req.modelImages.getImages(postId,model);
    res.status(200).send(oneData);
})
//Get specific post (specific images) (visitor) No need we get images from postid now.
/*visitorRouters.get('/:model/:postId/:modelImages/:imageId', async (req, res) => {
    let postId = parseInt(req.params.postId);
    let imageId = parseInt(req.params.imageId);
    let oneData = await req.modelImages.getImageById(postId, imageId);
    res.status(200).send(oneData);
})*/
//Filter one or more at the same time (visitor)
visitorRouters.get('/:model/:process/:city/:owner/:availability/:buildingAge/:furnished/:rooms/:bathRooms/:rentDuration/:floors/:priceFrom/:priceTo', async (req, res) => {
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


///search bar 

visitorRouters.post('/hi/search/:model/:term', async (req, res) => {


    let { term } = req.params;
    term = term.toLowerCase();
    
  let result= await  req.model.getSearch(term,Op)
    if (result) {
    
        res.status(200).send(result);
      } else {
        res.status(403).send(`Error: your search does not match3333333 any existing data`);
      }
})
    


module.exports = visitorRouters;
