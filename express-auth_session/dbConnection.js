require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

// connect to mongodb
function connectToMongoDB() {
	mongoose.connect(MONGODB_URI);

	mongoose.connection.on("connected", () => {
		console.log("Connected to MongoDB successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error connecting to MongoDB", err);
	});
}

module.exports = { connectToMongoDB };
