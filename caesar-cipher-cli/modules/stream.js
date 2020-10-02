const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

function encodeFile(input, output, shift, action, caesarEncoder) {
  const inputFile = path.resolve('caesar-cipher-cli', input);
  const outputFile = path.resolve('caesar-cipher-cli', output);

  const transformStream = new Transform ({
    transform(chunk, encoding, callback) {
      const str = new TextDecoder().decode(chunk);
      caesarEncoder(str, shift, action);
      callback();
    }
  })

  const read = fs.createReadStream(inputFile, 'utf-8');
  const write = fs.createWriteStream(outputFile);

  read.pipe(transformStream).pipe(write);
}

module.exports = encodeFile;
