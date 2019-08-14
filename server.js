const router = require('./posts-router');
const express = require('express');
const server = express();
server.use(express.json());
server.use('/api/posts', router );
module.exports = server;



