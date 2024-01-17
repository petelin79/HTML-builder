const fs = require('fs/promises');
const path = require('path');

function copyDir(out, inp) {
  let folder = path.join(__dirname, out);
  fs.readdir(folder).then((elem) => {
    const newFolder = path.join(__dirname, inp);
    fs.mkdir(newFolder, { recursive: true });
    elem.forEach((el) => {
      const fromFolder = path.join(__dirname, out, el);
      const toFolder = path.join(__dirname, inp, el);
      fs.copyFile(fromFolder, toFolder);
    });

    fs.readdir(newFolder).then((el) => {
      el.forEach((e) => {
        if (!elem.includes(e)) {
          const fromFolder = path.join(__dirname, inp, e);
          fs.rm(fromFolder);
        }
      });
    });
  });
}

copyDir('files', 'files-copy');
