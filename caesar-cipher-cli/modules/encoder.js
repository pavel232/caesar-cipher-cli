function caesarEncoder(string = '', shift = 0, action = 'encode') {
	const coderArray = [];
	shift = +shift % 26;
	if (action === 'decode') shift = -shift;
console.log(string)
	for(let char of string) {
		let charCode = char.charCodeAt();

		if (charCode > 96 && charCode < 123) {
			coderArray.push(((charCode - 97 + 26 + shift) % 26) + 97);
		} else if (charCode > 64 && charCode < 91) {
			coderArray.push(((charCode - 65 + 26 + shift) % 26) + 65);
		} else {
			coderArray.push(charCode);
		}
	}

	return String.fromCharCode(...coderArray);
}

module.exports = caesarEncoder;