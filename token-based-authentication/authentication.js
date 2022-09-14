require("dotenv").config();

const TOKEN = process.env.API_KEY;

function authenticateUser(req, res) {
	return new Promise((resolve, reject) => {
		let token = req.headers.authorization;
		if (!token) {
			reject({ statusCode: 400, message: "No token provided." });
		} else {
			token = token.split(" ")[1];
			if (TOKEN === token) {
				resolve();
			}
			reject({ statusCode: 401, message: "Invalid token provided." });
		}
	});
}

module.exports = {
	authenticateUser,
};
