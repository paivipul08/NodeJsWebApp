const jwt = require('express-jwt');
var env =process.env.NODE_ENV;
var configDB=require('../config/config.'+env);

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  /*if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }*/
 // return null;
 return authorization;
};

const auth = {
  required: jwt({
    secret: configDB.app.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: configDB.app.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;