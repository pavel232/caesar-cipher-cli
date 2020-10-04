const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const path = require('path');

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
			if(output) {
				const outputFile = path.resolve(output);

				fs.access(outputFile, fs.constants.W_OK, err => {
					if(err) {
						process.stderr.write(`Error: file ${err.path} does not exist or not writable\n`);
						process.exit(2);
					} else {
						fs.writeFile(outputFile, callback(line, shift, action), {flag: 'a'}, (err) => {
							if(err) process.stderr.write('Error: can not write file\n');
							rl.prompt();
						});
					};
				});
			} else {
				console.log('Output: ', callback(line, shift, action));
				rl.prompt();
			}
		};
	});
};


if(action !== 'encode' && action !== 'decode') {
	process.stderr.write('Error: invalid -a --action parameter (must be "encode" or "decode")\n');
	process.exit(1);
}
if(shift < 0) {
	process.stderr.write('Error: invalid -s --shift parameter (must be a positive number)\n');
	process.exit(1);
}

module.exports = {input, output, shift, action, encodeCli};