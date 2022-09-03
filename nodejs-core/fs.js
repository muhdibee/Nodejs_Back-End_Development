/**
 * The fs module provides a lot of useful  functionality to access and interact with file system.
 */

const fs = require('node:fs');
const path = require('path');

const poemFilePath = path.join(__dirname, 'files', 'poem.txt');

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