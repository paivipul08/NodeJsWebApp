const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password : {
         type: String,
         required : true
      }
  });
  
  UsersSchema.methods.setPassword = function(password) {
    //var randomBytes = crypto.randomBytes(16).toString('hex');
    const hash=bcrypt.hashSync(password,10);
    console.log("hash",hash);
    this.password =hash;//crypto.pbkdf2Sync(password, crypto.randomBytes(16).toString('hex'), 10000, 512, 'sha512').toString('hex');
    };
  
  UsersSchema.methods.validatePassword = function(password) {
    var flag=bcrypt.compareSync(password,this.password);
    //console.log("flag",flag);  
    return flag;
    //const passwordHash = crypto.pbkdf2Sync(password, crypto.randomBytes(16).toString('hex'), 10000, 512, 'sha512').toString('hex');
    //return this.password === passwordHash;
  };
  
  UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  
  UsersSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    };
  };

  mongoose.model('Users', UsersSchema);