const user = require("../src/user.js");

test("User Obj is returned properly", () => {
	const userObj = user.getUserDetails();
	expect(userObj.firstname).toBe("Muhammad");
	expect(userObj.lastname).toBe("Ibrahim");
	expect(userObj.age).toBe(24);
});
