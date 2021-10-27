'use strict';

const base64 = require('base-64');
const { users } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Auth error');
  }

  let basic = req.headers.authorization.split(' ');
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString);
  let [username, pass] = decodedString.split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};
