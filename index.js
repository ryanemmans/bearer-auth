'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models');
const server = require('./src/server');

const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  server.startup(PORT);
});