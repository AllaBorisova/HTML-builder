const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const path_folder = path.join(__dirname, 'secret-folder');

fs.readdir(path_folder, { withFileTypes: true }, (err, files) => {

  if (err) {
    console.log(err);
  } else {

    files.forEach(file => {
      if (file.isFile()) {

        (async () => {
          try {
            const stats = await fsPromises.stat(path.join(path_folder, file.name));
            const size = (stats.size / 1024).toFixed(3) + 'kb';
            const arr = file.name.split('.');
            arr.push(size);
            console.log(arr.join(' - '));
          }
          catch (error) {
            console.log(error);
          }
        })();

      }
    });

  }
});