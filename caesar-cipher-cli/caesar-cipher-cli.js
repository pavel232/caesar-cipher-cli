const program = require('./modules/cli-program');
const caesarEncoder = require('./modules/encoder');
const encodeFile = require('./modules/stream');


if (program.input) {
  const {input, output, shift, action} = program;
  encodeFile(input, output, shift, action, caesarEncoder);
} else {
  program.encodeCli(caesarEncoder);
};
