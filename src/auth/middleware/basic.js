'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    res.status(403).send('No Auth Headers');
    return _authError();
  }

  let basic = req.headers.authorization.split(' ')[1];
  let decoded = base64.decode(basic);
  let [username, pass] = decoded.split(':');

  try {
    req.user = await user.authenticateBasic({ where: { username, pass } });
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
}
