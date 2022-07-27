'use strict';
const modelFolder = require('../models/index.model');
const express = require('express');
const visitorRouters = express.Router();
const bearer = require("../auth/middleware/bearer.js");
const acl = require("../auth/middleware/acl.js");
const {users}= require('../models/index.model');

visitorRouters.param("model", (req, res, next) => {
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
})

//Get specific model posts (visitor)
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

visitorRouters.get('/:model/:postId/order/:userId', bearer, async (req, res) => {
    let userId =parseInt(req.user.id);
    let username= req.user.username;
        console.log(`💛 ${username} >>> the order has been sent ✔✔✔✔`);
    let postId = parseInt(req.params.postId)
    let oneData = await req.model.getOrder(postId,userId)

//    let userContact =await users.findOne({where: {id:userId}})
// oneData.userIdOrder=userId
res.status(200).send(oneData);
oneData.username=username;
    accept(oneData)
})


function accept(oneData){

    console.log(`💚 admin >>> hello mr ${oneData.username}, you can visit us on the office at 9:00am`)
}
module.exports = visitorRouters;