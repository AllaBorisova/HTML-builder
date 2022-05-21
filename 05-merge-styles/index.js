const path = require('path');
const fs = require('fs');

const path_to = path.join(__dirname, '/project-dist/bundle.css');
const path_from = path.join(__dirname, '/styles');


const writeStream = fs.createWriteStream(path_to);

fs.readdir(path_from, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        const arr = file.name.split('.');
        if (arr[1] === 'css') {

          const readStream = fs.createReadStream(path_from + '/' + file.name);

          readStream.on('data', chunk => {

            writeStream.write(chunk);


          });
        }
      }

    });

  }
});