'use strict';
const modelFolder = require('../models/index.model');
const express = require('express');
const routers = express.Router();
const bearer=require("../auth/middleware/bearer.js");
const acl=require("../auth/middleware/acl.js");

routers.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
}) 


//Get specific model posts (visitor)
routers.get('/:model',async(req,res)=>{
    let allData = await req.model.get();
    res.status(200).send(allData);
})

//Get specific model posts (user)
routers.get('/:userId/:model',async(req,res)=>{
    let allData = await req.model.get();
    res.status(200).send(allData);
})

//Create posts 
routers.post('/:userId/newpost/:model',bearer, acl('CRUD'),async(req,res)=>{
    const userId = parseInt(req.params.userId);
    let newModel = req.body;
    let model = await req.model.createRecord(userId,newModel);
    if(model){
       res.status(201).json(model);
    }else{
        res.status(403).send('User ID not exist ');
    }
})

//Update posts
routers.put('/:userId/dashboard/:id',bearer, acl('updateHisPosts'),async(req,res)=>{
    const username = req.params.username;
    const id = parseInt(req.params.id);
    let updateModel = req.body; 
    let updatedModel = await req.model.updateRecord(username,updateModel,id);
    if(updatedModel){
        if(updatedModel[0]!=0){
            res.status(201).json(updatedModel[1]);
        }else{
            res.status(403).send(`There is no model with this id: ${id}`);
        }
    }
    else{
        res.status(403).send(`There is an error in updating post, check the post id or if you are signed in or not`);
    }
})


module.exports = routers;