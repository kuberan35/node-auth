const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
})

const User = mongoose.model('User',userSchema );

function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;