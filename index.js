const express = require('express');
const server = express();
const db = require('./data/db')
// const server = require('./server');

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
})

