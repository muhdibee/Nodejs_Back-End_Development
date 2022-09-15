const fs = require("fs");
const path = require("path");

const usersDbPath = path.join(__dirname, "db", "users.json");

function authenticateUser(req, res, role) {
	return new Promise((resolve, reject) => {
		const body = [];

		req.on("data", (chunk) => {
			body.push(chunk);
		});

		req.on("end", () => {
			const parsedbody = Buffer.concat(body).toString();

			if (!parsedbody) {
				reject({ statusCode: 400, message: "No username or password provided" });
			} else {
				const { user: userDetails, book } = JSON.parse(parsedbody);
				fs.readFile(usersDbPath, "utf-8", (err, data) => {
					if (err) {
						reject({ statusCode: 500, message: "Error in reading userDb path, Please try again later" });
					} else {
						const allUsers = JSON.parse(data);
						const userFound = allUsers.find((user) => user.username === userDetails.username && user.password === userDetails.password);
						if (userFound) {
							if (role.includes(userFound.role)) {
								resolve(book);
							}
							reject({ statusCode: 401, message: "You don't have the right permission for this operation." });
						}
						reject({ statusCode: 400, message: "Wrong username or Password" });
					}
				});
			}
		});
	});
}

module.exports = {
	authenticateUser,
};
