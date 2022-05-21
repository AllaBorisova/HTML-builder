const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const path_new = path.join(__dirname, '/files-copy');
const path_folder = path.join(__dirname, '/files');

fsPromises.rm(path_new, { recursive: true }).then(() => {
  //console.log('delete');
  test();

}).catch(() => {
  test();
});



function test() {
  fsPromises.mkdir(path_new, { recursive: true }).then(function () {
    fs.readdir(path_folder, { withFileTypes: true }, (error, files) => {
      if (error) {
        console.log(error);
      } else {
        files.forEach(file => {
          fsPromises.copyFile(path_folder + '/' + file.name, path_new + '/' + file.name).then(function () {
            console.log('copied');
          }).catch(function (error) {
            console.log(error);
          });
        });
      }
    });

  }).catch(function (error) {
    console.log(error);
  });
}
