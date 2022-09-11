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
     }else if (req.url === '/books' && req.method === 'POST'){
         addBook(req, res);
     }/*else if (req.url === '/books' && req.method === 'PUT'){
    /*     UpdateBook(req, res);
    // }else if (req.url === '/books' && req.method === 'DELET'){
    //     deleteBook(req, res);
    // } */

});

// Retreive all books using /books
function getAllBooks (req, res){
    fs.readFile(bookDbPath, 'utf-8', async(err, data) => {
        if(err){
            console.log(err)
            res.writeHead(500);
            res.end('Error in reading bookDb path');
        }else {
            res.writeHead(200);
            res.end(data);
        }
    })
}

//Add a book using /books
function addBook(req, res){
    const body =[]

    req.on('data', (chunk)=>{
        body.push(chunk)
    })
    req.on('end', ()=>{
        const parsedbody = Buffer.concat(body).toString();
        const newBook = JSON.parse(parsedbody);
        console.log(newBook);
        fs.readFile(bookDbPath, 'utf-8', (err, data) =>{
            if(err){
                console(err);
                res.writeHead(500);
                res.end('Error in reading bookDb path');
            }else{
                const currentBooks = JSON.parse(data);
                const updatedBooks = [...currentBooks, newBook];
                console.log('currentBooks: ', currentBooks);
                console.log('updatedBooks:', updatedBooks);

                // update the bookDbPath
                fs.writeFile(bookDbPath, JSON.stringify(updatedBooks), (err) => {
                    if(err){
                        res.writeHead(500, 'Error in writing to bookDb path');
                        console('WriteFile Error: ', err);
                    }else{
                        res.writeHead(200)
                        res.end(JSON.stringify(updatedBooks));
                    }
                })
            }
        })
    });
}






//Listen on specific port and host name.
SERVER.listen(PORT, HOST_NAME, () => {
    console.log(`Server started successfully at https://${HOST_NAME}:${PORT}`);
});