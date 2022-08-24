/*
The path module provide utilities for working with file and directory paths.

*/

// Require the path module
const path = require ('path');
console.log('path Object: ' + path);


// the path.sep Object gets the separator for running machine. the (/): for Linux and Mac machines, while the (\): Is for the Windows machine.
// Get the path separator
const separator = path.sep;
console.log('path Separator: ' + separator);


// the path.dirname is used to get the directory portion of a path
// Get a path's directory name
const dirName = path.dirname('C:/Users/Muhammad Ibrahim/Downloads/Nodejs_Back-End_Development/nodejs-core/path.js');
console.log('path base directory name: ' + dirName);


// the path.basename is the last file or folder in a path
// Get the path base name
const baseName = path.basename(('C:/Users/Muhammad Ibrahim/Downloads/Nodejs_Back-End_Development/nodejs-core/path.js'));
console.log('path base name: ' + baseName);


// The path.extname is used to get the extension of file / path.
// Get the path extension name.
 const extensionName = path.extname('C:/Users/Muhammad Ibrahim/Downloads/Nodejs_Back-End_Development/nodejs-core/path.js');
 console.log('path extension name: ' + extensionName);
