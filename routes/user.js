const {User,validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const md5=require('md5')
const bcrypt=require('bcrypt');
//const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth')
const saltRounds=10;

router.get('/', async (req, res) => {
  const user = await User.find().sort('email');
  res.send(user);
});

router.get('/me',auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//registering
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 
  const email=req.body.email
  const password=req.body.password
  const exUser=User.findOne({email:email})

if(!exUser){
  res.send("email already taken")
}
else{
  bcrypt.hash(password,saltRounds,async function(err,hash){
  let user = new User({ 
    email: req.body.email,
    password: hash
  });
  user = await user.save();
  res.send(user);
})
}}
);
//login


// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(req.params.id,
//     { 
//       email: req.body.email,
//       pasword: req.body.pasword,
//     }, { new: true });

//   if (!user) return res.status(404).send('The customer with the given ID was not found.');
  
//   res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//   const customer = await Customer.findByIdAndRemove(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
// });

// router.get('/:id', async (req, res) => {
//   const customer = await Customer.findById(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
// });

module.exports = router;