const {User,validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const md5=require('md5')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//require('dotenv').config();

router.post('/login', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const email=req.body.email
    const password=req.body.password
    const exUser=await User.findOne({email:email})
  if(exUser){
    bcrypt.compare(password,exUser.password, function(err, result) {
      // result == true
      if(result){
        
        const token=jwt.sign({_id:exUser._id,isAdmin:exUser.isAdmin},'MySecretKey')
        res.header('x-auth-key',token).send()
        //console.log(token)
        //  res.send(token)
      }
      else{
        res.send("wrong password")
      }
  })
  }
  else{
      res.send("email not available");
  }
  });
  module.exports=router;