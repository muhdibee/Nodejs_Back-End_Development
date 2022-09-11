const http = require('http');
const path = require('path');
const fs = require('fs');

const bookDbPath = path.join(__dirname, 'db', 'books.json');

const HOST_NAME = '0.0.0.0';
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {
    if (req.url === '/books' && req.method === 'GET'){
        getAllBooks(req, res);
     }
     /*else if (req.url === '/books' && req.method === 'POST'){
    //     addBook(req, res);
    // }else if (req.url === '/books' && req.method === 'PUT'){
    //     UpdateBook(req, res);
    // }else if (req.url === '/books' && req.method === 'DELET'){
    //     deleteBook(req, res);
    // } */

});

// Retreive all books using /books
const getAllBooks = function (req, res){
    fs.readFile(bookDbPath, 'utf-8', async(err, data) => {
        if(err){
            console.log(err)
            res.writeHead(500, 'Error in reading bookDb path');
            res.end('An error occured');
        }else {
            res.end(data);
            console.log('success: /Books GET request');
        }
    })
}





//Listen on specific port and host name.
SERVER.listen(PORT, HOST_NAME, () => {
    console.log(`Server started successfully at https://${HOST_NAME}:${PORT}`);
});