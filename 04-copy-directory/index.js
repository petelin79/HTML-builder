const fs = require('fs/promises');
const path = require('path');

function copyDir(output, input) {
  fs.readdir(path.join(__dirname, output)).then((arr) => {
    fs.mkdir(path.join(__dirname, input), { recursive: true });
    arr.map((elem) => {
      fs.copyFile(
        path.join(__dirname, output, elem),
        path.join(__dirname, input, elem),
      );
    });

    fs.readdir(path.join(__dirname, input)).then((ar) => {
      ar.map((elem) => {
        if (!arr.includes(elem)) {
          fs.rm(path.join(__dirname, input, elem));
        }
      });
    });
  });
}

copyDir('files', 'files-copy');