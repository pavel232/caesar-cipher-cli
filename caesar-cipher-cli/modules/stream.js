const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./error-handler');


function encoder(input, output, shift, action, caesarEncoder) {
  const readStream = getReadStream(input);
  const writeStream = getWriteStream(output);


  const transformStream = new Transform ({
    transform(chunk, encoding, callback) {
      this.push(caesarEncoder(chunk.toString(), shift, action));
      callback();
    }
  });
  
  pipeline(
    readStream,
    transformStream,
    writeStream,
    err => {
      if(err) {
        errorHandler(err, 3);
      }
    }
  );
}


function getReadStream(input) {
  if(input) {
    const inputFile = path.resolve(input);
    return fs.createReadStream(inputFile, 'utf-8');
  } else {
    return process.stdin;
  }
}

function getWriteStream(output) {
  if(output) {
    const outputFile = path.resolve(output);
    try {
      fs.accessSync(output, fs.constants.W_OK);
      return fs.createWriteStream(outputFile, {flags: 'a'});
    } catch(err) {
      errorHandler(err, 4);
    }
  } else {
    return process.stdout;
  }
}


module.exports = encoder;
