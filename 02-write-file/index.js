const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const path_file = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(path_file);
const readline = require('readline');

console.log('Hello, enter text');

const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
  if (input === 'exit') {

    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

process.on('beforeExit', () => {
  console.log('bye-bye)');
});




//console.log('Hello, enter text');


// output.write(chunk);


// fs.writeFile(
//   path.join(__dirname, '02-write-file', 'test.txt'),
//   'Hello world',
//   (err) => {
//     if (err) throw err;
//     console.log('done');
//   }
// )