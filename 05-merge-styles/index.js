const fsProm = require('fs/promises');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const newFile = path.join(__dirname, 'project-dist', 'bundle.css');

let writeStream = fs.createWriteStream(newFile);

let arr = new Array();
fsProm
  .readdir(folder, { withFileTypes: true })
  .then((elems) => {
    elems.forEach((elem) => {
      let route = path.join(folder, elem.name);
      if (elem.isFile() && path.extname(route) === '.css') {
        arr.push(elem);
      }
    });
  })
  .then(() => {
    arr.forEach((el) => {
      let route = path.join(folder, el.name);
      let readStream = fs.createReadStream(route, 'utf-8');
      readStream.pipe(writeStream);
    });
  });
