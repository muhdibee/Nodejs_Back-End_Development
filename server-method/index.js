//Require the server.
const http = require('http');
const nodemon = require('nodemon');

const HOSTNAME = '0.0.0.0';
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {});

//Listen on specific port and host name.
SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server started successfully at https://${HOSTNAME}:${PORT}`);
});