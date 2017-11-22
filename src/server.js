const http = require('http');
const router = require('./router');
const env = require('env2')('.env');
// const port = 8000; come back, process.env

const server = http.createServer(router);
server.listen(port, () => process.stdout.write(`server is running on ${port}`));