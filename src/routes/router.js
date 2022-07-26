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
//Create posts 
routers.post('/newpost/:userId/:model', bearer, acl('CRUD'), async (req, res) => {
    let userId = parseInt(req.params.userId);
    let newModel = req.body;
    let model = await req.model.createRecord(req.user.id, userId, newModel);
    if (model) {
        res.status(201).send(model);
    } else {
        res.status(403).send('the real user id not matching the id that you sent by params ');
    }
})
//Get one of my posts (user)
routers.get('/dashboard/:userId/:model/:postId', bearer, acl('CRUD'), async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let oneData = await req.model.getOneDash(userId, postId);
    if (oneData) {
        res.status(200).send(oneData);
    } else {
        res.status(403).send('the real user id not matching the id that you sent by params ');
    }
});
//Get all my posts (user)//
routers.get('/dashboard/:userId/:model', bearer, acl('CRUD'), async (req, res) => {
    const userId = parseInt(req.params.userId);
    let oneData = await req.model.getAllDash(userId);
    if (oneData) {
        res.status(200).send(oneData);
    } else {
        res.status(403).send('the real user id not matching the id that you sent by params ');
    }
});
//Update my posts
routers.put('/dashboard/:userId/:model/:postId', bearer, acl('CRUD'), async (req, res) => {
    console.log('====================================');
    console.log(req.body.role);
    console.log('====================================');
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let obj = req.body;
    let updatedModel = await req.model.updateDash(userId, postId, obj);
    if (updatedModel) {
        if (updatedModel[0] != 0) {
            res.status(201).json(updatedModel[1]);
        } else {
            res.status(403).send(`There is no model with this id`);
        }
    }
    else {
        res.status(403).send(`There is an error in updating post, check the post id or if you are signed in or not`);
    }
})
//Delete my posts
routers.delete('/dashboard/:userId/:model/:postId', bearer, acl('CRUD'), async (req, res) => {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    let deletedModel = await req.model.removeDash(userId, postId);
    if (deletedModel) {
        res.send("Deleted Successfully");
        res.status(204);
    }
    else {
        res.status(403).send(`There is an error in deleting post, check the post id or if you are signed in or not`);
    }

});

module.exports = routers;