
const fs = require('fs');
const path = require('path');
const path_file = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(path_file, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
