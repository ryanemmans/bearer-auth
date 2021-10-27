'use strict';

const base64 = require('base-64');
const { users } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Auth error');
  }

  let basic = req.headers.authorization.split(' ');
  let encoded = basic.pop();
  let decoded = base64.decode(encoded);
  let [username, pass] = decoded.split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};
