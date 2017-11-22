const http = require('http');
const request = require('request');
const router = require('./router');
const port = 8000;

const server = http.createServer(router);

server.listen(port, () => process.stdout.write(`server is running on ${port}`));