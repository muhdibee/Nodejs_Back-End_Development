// sum function
function sum(a, b) {
	return a + b;
}

// subtraction function
function sub(a, b) {
	return a - b;
}

// Multiplication function
function mul(a, b) {
	return a * b;
}

// Division function
function div(a, b) {
	return a / b;
}

// Exponent function
function pow(a, b) {
	return Math.pow(a, b);
}

// Mean function
function mean(arr) {
	const size = arr.length;
	let ans = 0;
	arr.forEach((element) => {
		ans = ans + element;
	});

	return ans / size;
}

//Export all functions
module.exports = { sum, sub, mul, div, pow, mean };
