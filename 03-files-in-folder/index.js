const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder).then((elem) => {
  elem.forEach((el) => {
    const name = el.slice(0, el.lastIndexOf('.'));
    const ext = path.extname(el).slice(1);
    fs.stat(path.join(__dirname, 'secret-folder', el)).then((e) => {
      if (e.isFile()) {
        console.log(name + ' - ' + ext + ' - ' + e.size / 1024 + 'kb');
      }
    });
  });
});
