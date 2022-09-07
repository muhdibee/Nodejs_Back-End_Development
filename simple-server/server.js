// Require HTTP module
const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 8000;

const SERVER = http.createServer();

SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server started successfully at https://${HOSTNAME}:${PORT}`)
})