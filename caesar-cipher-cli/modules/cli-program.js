const { Command } = require('commander');
const program = new Command();

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'Phrase to encode: '
});


program
	.storeOptionsAsProperties(false)
	.requiredOption('-a, --action <action>', 'encode/decode')
	.requiredOption('-s, --shift <shift>', 'a shift')
	.option('-i, --input <input-src>', 'an input file')
	.option('-o, --output <output-src>', 'an output file')
	.parse(process.argv);

let {input, action, output, shift} = program.opts();


function encodeCli(callback) {
	rl.prompt();

	rl.on('line', line => {
		if (line === '--exit') {
			rl.close();
			process.exit(0);
		} else {
			console.log('Output: ', callback(line, shift, action));
			rl.prompt();
		};
	});
};


if(action !== 'encode' && action !== 'decode') {
	console.error('Error: invalid -a --action parameter (must be "encode" or "decode")');
	process.exit(1);
}
if(shift < 0) {
	console.error('Error: invalid -s --shift parameter (must be a positive number)');
	process.exit(1);
}

module.exports = {input, output, shift, action, encodeCli};
