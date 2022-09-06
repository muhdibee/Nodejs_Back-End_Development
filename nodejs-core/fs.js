/**
 * The fs module provides a lot of useful  functionality to access and interact with file system.
 */

const fs = require('node:fs');
const path = require('path');

const poemFilePath = path.join(__dirname, 'files', 'poem.txt');
const newFilePath = path.join(__dirname, 'files', 'newFile.txt');

const content = 'This is the content of this file.'

// opening a file asyncronusly for reading
fs.open(poemFilePath, 'r', (err, data) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('File opened successfully.');

    // After opening the file, you can then do any operation like Reading, Writing, appending, etc.
    //Reading a file.
    fs.readFile(data, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('File read successfully.');
        console.log(data)
    })
})

// Getting path statistics asyncronously and print them
fs.stat(poemFilePath, (err,stats)=> {
    if(err){
        console.log(err)
    } else{
        console.log('Path statistics: ', stats);

        // Get specific path stat and print them
        console.log('Path is a file: ', stats.isFile());
        console.log('Path is a directory: ', stats.isDirectory());
        console.log('Path size: ', stats.size);
    }

});

// Getting path statistics syncronously and print them
const pathStat = fs.statSync(poemFilePath);
console.log('Path statistics: ', pathStat);

//Writing to file asynchronously
// writeFile() overwrites the content of the file.
fs.writeFile(newFilePath, content, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('WriteFile Output: File written to successfully');
});

//appending to file to file asynchronously
// appendFile() overwrites the content of the file.
fs.appendFile(newFilePath, '\nThis is an appended sentence.', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('appendFile Output: Appending to file success');
});
