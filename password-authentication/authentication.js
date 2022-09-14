const fs = require("fs");
const path = require("path");

const usersDbPath = path.join(__dirname, "db", "users.json");

function authenticateUser(req, res) {
	return new Promise((resolve, reject) => {
		const body = [];

		req.on("data", (chunk) => {
			body.push(chunk);
		});

		req.on("end", () => {
			const parsedbody = Buffer.concat(body).toString();

			if (!parsedbody) {
				reject("No username or password provided");
			} else {
				const userDetails = JSON.parse(parsedbody);
				fs.readFile(usersDbPath, "utf-8", (err, data) => {
					if (err) {
						reject("Error in reading userDb path");
					} else {
						const allUsers = JSON.parse(data);
						const userFound = allUsers.find((user) => user.username === userDetails.username);
						if (userFound) {
							if (userFound.username === userDetails.username && userFound.password === userDetails.password) {
								resolve();
							}
						}
						reject("Wrong username or Password");
					}
				});
			}
		});
	});
}

module.exports = {
	authenticateUser,
};
