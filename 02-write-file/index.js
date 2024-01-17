const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const writeFile = path.join(__dirname, 'input.txt');
const writeStream = fs.createWriteStream(writeFile);

process.stdout.write('Print your message, pls:' + '\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (txt) => {
  if (txt === 'exit') {
    rl.close();
  } else {
    writeStream.write(txt + '\n');
    process.stdout.write('Print next message, pls:' + '\n');
  }
});
rl.on('close', () => {
  process.stdout.write('Bye-bye');
});
