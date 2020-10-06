const { Command } = require('commander');
const program = new Command();
const errorHandler = require('./error-handler');


program
	.storeOptionsAsProperties(false)
	.requiredOption('-a, --action <action>', 'encode/decode')
	.requiredOption('-s, --shift <shift>', 'a shift')
	.option('-i, --input <input-src>', 'an input file')
	.option('-o, --output <output-src>', 'an output file')
	.parse(process.argv);

const {input, action, output, shift} = program.opts();


if(action !== 'encode' && action !== 'decode') {
	const error = new Error('invalid -a --action parameter (must be "encode" or "decode")')
	errorHandler(error, 1);
}
if(shift < 0) {
	const error = new Error('invalid -s --shift parameter (must be a positive number)')
	errorHandler(error, 2);
}

module.exports = {input, output, shift, action};
