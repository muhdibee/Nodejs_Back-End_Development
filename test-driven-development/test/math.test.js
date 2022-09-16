const { sum, sub, mul, pow, div, mean } = require("../src/mathLib");

// Test sum func
test("Sum 90 + 10 to equal 100", () => {
	expect(sum(90, 10)).toBe(100);
});

// Test sub func
test("Sub 10 - 8 to equal 2", () => {
	expect(sub(10, 8)).toBe(2);
});

// Test Mul func
test("Mul 5 * 10 to equal 50", () => {
	expect(mul(5, 10)).toBe(50);
});

// Test pow func
test("pow 5 ** 3 to equal 125", () => {
	expect(pow(5, 3)).toBe(125);
});

// Test div func
test("Div 150 / 3 to equal 50", () => {
	expect(div(150, 3)).toBe(50);
});

// Test mean func
test("Mean [2, 3, 1, 3, 1] to equal 2", () => {
	expect(mean([2, 3, 1, 3, 1])).toBe(2);
});
