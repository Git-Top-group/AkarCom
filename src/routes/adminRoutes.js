'use strict';
const modelFolder = require('../models/index.model');
const express = require('express');
const adminRouters = express.Router();
const bearer=require("../auth/middleware/bearer.js");
const acl=require("../auth/middleware/acl.js");

adminRouters.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
}) 



adminRouters.get('/admin/:model',bearer , acl('CRUD_Users'), async (req,res)=>{
    console.log("from adminRouters  **********")
    let allData = await req.model.getAll();
    res.status(200).send(allData);
})

//need some edit 
adminRouters.post('/admin/:userId/newpost/:model',bearer, acl('CRUD_Users'),async(req,res)=>{
    let userId =parseInt(req.params.userId);
    let newModel = req.body;
    let model = await req.model.createAdminRecord(userId,newModel);
    if(model){
       res.status(201).json(model);
    }else{
        res.status(403).send('User ID not exist ');
    }
})

adminRouters.delete('/admin/:model/:postId',bearer, acl('CRUD_Users'),async(req,res)=>{

    const postId = parseInt(req.params.postId);
    let deletedModel = await req.model.removeUserRecord(postId);
    if(deletedModel){
        res.send("Deleted Successfully");
        res.status(204);
    }
    else{
        res.status(403).send(`There is an error in deleting post, check the post id or if you are signed in or not`);
    }
    
})


module.exports = adminRouters;