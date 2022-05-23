const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const path_to = path.join(__dirname, 'project-dist');

fsPromises.rm(path_to, { recursive: true }).then(() => {

  generateHtml()
  createDir();
  generateCss();
  copyAssets(path.join(__dirname, 'assets'), path.join(path_to, 'assets'));

}).catch(() => {

  generateHtml();
  createDir();
  generateCss();
  copyAssets(path.join(__dirname, 'assets'), path.join(path_to, 'assets'));
});



function generateHtml() {
  // i'm sorry, i don't understand await/async and i use callbacks, a lot of callbacks...
  const readableStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  let data = '';

  readableStream.on('data', chunk => {
    data += chunk;
  });
  readableStream.on('end', () => {
    let new_arr = data.split('{{header}}');

    let header = '';
    let new_data = '';

    const hrs = fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8');
    hrs.on('data', chunk => {
      header += chunk;
    });
    hrs.on('end', () => {
      new_data = new_arr.join(header);
      let new_arr2 = new_data.split('{{articles}}');

      let main = '';
      let new_data2 = '';

      const ars = fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf-8');
      ars.on('data', chunk => {
        main += chunk;
      });

      ars.on('end', () => {
        new_data2 = new_arr2.join(main);
        let new_arr3 = new_data2.split('{{footer}}');

        let footer = '';
        let new_data3 = '';

        const ars = fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf-8');
        ars.on('data', chunk => {
          footer += chunk;
        });

        ars.on('end', () => {
          new_data3 = new_arr3.join(footer);
          const writeStream = fs.createWriteStream(path.join(__dirname, '/project-dist/index.html'));
          writeStream.write(new_data3);
        })
      })


    })


  })



}

function createDir() {
  fsPromises.mkdir(path_to, { recursive: true }).then(function () {
    console.log('create');
  }).catch(function (error) {
    console.log(error);
  });
}

function copyAssets(from, to) {
  fsPromises.mkdir(to, { recursive: true }).then(function () {
    fs.readdir(from, { withFileTypes: true }, (error, files) => {
      if (error) {
        console.log(error);
      } else {
        files.forEach(file => {
          if (file.isDirectory()) {
            copyAssets(path.join(from, file.name), path.join(to, file.name))
          } else {
            fsPromises.copyFile(path.join(from, file.name), path.join(to, file.name)).then(function () {
            }).catch(function (error) {
              console.log(error);
            });
          }

        });
      }
    });

  }).catch(function (error) {
    console.log(error);
  });
}

function generateCss() {
  const writeStream = fs.createWriteStream(path.join(path_to, 'style.css'));
  const path_from = path.join(__dirname, 'styles');

  fs.readdir(path_from, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach(file => {
        if (file.isFile()) {
          const arr = file.name.split('.');
          if (arr[1] === 'css') {

            const readStream = fs.createReadStream(path.join(path_from, file.name));

            readStream.on('data', chunk => {
              writeStream.write(chunk);
            });
          }
        }

      });

    }
  });
}