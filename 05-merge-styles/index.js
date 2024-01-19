const fsProm = require('fs/promises');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const newFile = path.join(__dirname, 'project-dist', 'bundle.css');

let writeStream = fs.createWriteStream(newFile);

fsProm
  .readdir(folder, { withFileTypes: true })
  .then((elems) => {
    return elems.filter((elem) => {
      return (
        elem.isFile() && path.extname(path.join(folder, elem.name)) === '.css'
      );
    });
  })
  .then((arr) => {
    arr.map((elem) => {
      fs.createReadStream(path.join(folder, elem.name), 'utf-8').pipe(
        writeStream,
      );
    });
  });
