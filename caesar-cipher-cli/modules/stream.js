const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

function encodeFile(input, output, shift, action, caesarEncoder) {
  const inputFile = path.resolve(input);
  const read = fs.createReadStream(inputFile, 'utf-8');

  if(output) {
    const outputFile = path.resolve(output);

    fs.access(outputFile, fs.constants.W_OK, err => {
      if(err) {
        process.stderr.write(`Error: file ${err.path} does not exist or not writable\n`);
        process.exit(2);
      } else {
        const write = fs.createWriteStream(outputFile, {
          flags: 'a'
        });

        const transformStream = new Transform ({
          transform(chunk, encoding, callback) {
            const str = new TextDecoder().decode(chunk);
            this.push(caesarEncoder(str, shift, action));
            callback();
          }
        });

        pipeline(
          read,
          transformStream,
          write,
          err => {
            if(err) {
              process.stderr.write(`Error: unknown error(${err.code})\n`);
              process.exit(3);
            }
          }
        );

        write.on('finish', () => {
          process.exit(0);
        })
      }
    });
  } else {
    read.on('data', data => {
      process.stdout.write(caesarEncoder(data, shift, action));
      process.exit(0);
    });
  };
}

module.exports = encodeFile;