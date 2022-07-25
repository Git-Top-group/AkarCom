'use strict';
const express = require('express');
const authRouter = express.Router();
const { users } = require('../models/index.model');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log(userRecord.token);
    const output = {
      user: userRecord,
      //token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
    console.log(req.user.token);

  const user = {
    user: req.user,
    //token: req.user.token
  };

  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('CRUD_Users'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(201).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

authRouter.get('/:userId/dashboard', bearerAuth, async (req, res, next) => {
    let userId = parseInt(req.params.userId);
    const user = await users.findOne({where: {id:userId}});
    const posts = await models.findAll({where: {userId:userId}});
    res.status(200).send('Welcome to the secret area')
  });
  
  //Update posts
routers.put('/:userId/dashboard/:model/:postId',bearer, acl('CRUD'),async(req,res)=>{
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  let obj = req.body; 
  let updatedModel = await req.model.update(userId,postId,obj);
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

module.exports = authRouter;