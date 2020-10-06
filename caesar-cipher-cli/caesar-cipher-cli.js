const program = require('./modules/cli-program');
const caesarEncoder = require('./modules/encoder');
const encoder = require('./modules/stream');


const {input, output, shift, action} = program;
encoder(input, output, shift, action, caesarEncoder);
