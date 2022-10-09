"use strict";
const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index.model");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");
const permissions = require("./middleware/acl.js");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstring';

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log(userRecord.token);
    const output = {
      user: userRecord,
      // token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});


authRouter.post("/signin", basicAuth, (req, res, next) => {


  const user = {
    user: req.user,

  };

  res.status(200).json(user);
});

authRouter.delete("/delete/:username", bearerAuth, permissions("CRUD_Users"), async (req, res, next) => {
  let username = req.params.username;
  try {
    let deleted = await users.destroy({ where: { username: username } });
    res.status(204).send("user deleted");
    return deleted;
  } catch (e) {
    console.error("Error in deleting record in user ", username);

  }
}
);



authRouter.get('/signout', basicAuth, async (req, res, next) => {
  let ntoken = req.user.token;
  res.clearCookie(ntoken);
  // return res.status(200).send("logout")
   return res.redirect('/'); 
})


authRouter.put('/user/profile/:id/update', bearerAuth,permissions('CRUD'), async (req, res, next) => {
  let id = parseInt(req.params.id);
  let newPassword = req.body.password;
  if (id === req.user.id || req.user.role === "admin"){
    
    let newhashedPass = await bcrypt.hash(newPassword, 10);

    let obj = {
      username: req.body.username,
      password: newhashedPass,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      city: req.body.city,
      dataOfBirth: req.body.dataOfBirth,
      userImage: req.body.userImage,
    }
    let updated = await users.update(obj, { where: { id: id }, returning: true, })
    if (updated) {
      console.log(updated);
      // return updated;
      res.status(201).send(updated)
    }
  }else{
    res.send("you can't update other users profiles");
  }
})

authRouter.get("/secret", bearerAuth, (req, res, next) => {


  const secretInfo = {
    secret: "Welcome to the secret area 🔐",
    user: req.user,
    token: `📌 ${req.user.token}`,
  };
  res.status(200).json(secretInfo);
});
//api code 
authRouter.post("/sendEmail", async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    EmailSender({ name, email, message, subject });
    res.json({ msg: "your message sent successfuly" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

//email sender
const EmailSender = ({ name, email, message, subject }) => {
  const options = {
    from: name,
    to: email,
    subject: subject,
    html: message,
  };
  let transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gittopltuc@gmail.com", // add email 
      pass: "hquwyrjewqtxthcv", // password for email
    },
  });
  transpoter.sendMail(options, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

module.exports = authRouter;
