// Require HTTP module
const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {
    // console.log(req);
    res.writeHead(200);
    res.write('Hello from the server.');
    res.write('\nHello again');
    res.end('\nThe end.');

});

//Listen on specific port and host name.
SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server started successfully at https://${HOSTNAME}:${PORT}`);
});