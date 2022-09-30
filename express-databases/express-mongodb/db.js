const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

// Connect to mongodb;
const connectionToMongoDB = () => {
	mongoose.connect(MONGODB_CONNECTION_URL);

	mongoose.connection.on("connected", () => {
		console.log("Connected successfully to mongoDB");
	});
	mongoose.connection.on("error", (error) => {
		console.log("Error: ", error);
		console.log("An error ocurred");
	});
};

module.exports = { connectionToMongoDB };
