//Require the server.
const http = require('http');

// Requiring fixture module
const {books, authors} = require('./fixtures');

const HOSTNAME = 'localhost';
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            res.writeHead(200)
            res.end('You are welcome.');
            break;

        case '/books':
            res.writeHead(200)
            res.end(JSON.stringify(books));
            break;
        case '/authors':
            res.writeHead(200)
            res.end(JSON.stringify(authors));
            break;
        default:
            res.writeHead(400)
            res.end('Request not found');
    }
});

//Listen on specific port and host name.
SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server started successfully at https://${HOSTNAME}:${PORT}`);
});