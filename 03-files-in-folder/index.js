const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder).then((arr) => {
  arr.map((elem) => {
    fs.stat(path.join(__dirname, 'secret-folder', elem)).then((file) => {
      if (file.isFile()) {
        console.log(
          `${elem.slice(0, elem.lastIndexOf('.'))} - ${path
            .extname(elem)
            .slice(1)} - ${file.size / 1024}kb`,
        );
      }
    });
  });
});
