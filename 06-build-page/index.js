const path = require('path');
const fsProm = require('fs/promises');
const fs = require('fs');

const joinFile = (output, input) => {
  let writeStream = fs.createWriteStream(input);
  fsProm
    .readdir(output, { withFileTypes: true })
    .then((elems) => {
      return elems.filter((elem) => {
        return (
          elem.isFile() && path.extname(path.join(output, elem.name)) === '.css'
        );
      });
    })
    .then((arr) =>
      arr.map((elem) => {
        fs.createReadStream(path.join(output, elem.name), 'utf-8').pipe(
          writeStream,
        );
      }),
    );
};

const makeCopyFolder = (output, input) => {
  fsProm.readdir(output, { withFileTypes: true }).then((arr) => {
    fsProm.mkdir(input, { recursive: true });
    arr.map((elem) => {
      if (elem.isDirectory()) {
        makeCopyFolder(
          path.join(output, elem.name),
          path.join(input, elem.name),
        );
      } else {
        fsProm.copyFile(
          path.join(output, elem.name),
          path.join(input, elem.name),
        );
      }
    });
    fsProm.readdir(input, { withFileTypes: true }).then((arr) => {
      arr.map((elem) => {
        if (!arr.map((el) => el.name).includes(elem.name)) {
          fs.rm(path.join(input, elem.name), { recursive: true }, (error) => {
            if (error) throw error;
          });
        }
      });
    });
  });
};

const pasteComponents = () => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'index.html'),
  );
  const readStream = fs.createReadStream(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );
  readStream.on('data', (val) => {
    let res = val;
    fsProm
      .readdir(path.join(__dirname, 'components'), { withFileTypes: true })
      .then((elems) => {
        return elems.filter((elem) => {
          return (
            path.extname(path.join(__dirname, 'components', elem.name)) ==
            '.html'
          );
        });
      })
      .then((arr) =>
        arr.map((elem, idx) => {
          fs.createReadStream(
            path.join(__dirname, 'components', elem.name),
            'utf-8',
          ).on('data', (f) => {
            res = res
              .toString()
              .replace(
                `{{${elem.name.slice(0, elem.name.lastIndexOf('.'))}}}`,
                f,
              );
            if (idx === arr.length - 1) {
              writeStream.write(res);
            }
          });
        }),
      );
  });
};

fsProm.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
makeCopyFolder(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets'),
);
joinFile(
  path.join(__dirname, 'styles'),
  path.join(__dirname, 'project-dist', 'style.css'),
);
pasteComponents();
