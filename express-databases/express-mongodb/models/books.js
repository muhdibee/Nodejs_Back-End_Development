const mongoose = require("mongoose");

// Define a schema
const books = new mongoose.Schema({
	title: {
		type: String,
		required,
	},
	shortDescription: {
		type: String,
		max: [150, "Most not be more than 150 characters."], //validation with custom message
		required,
	},
	year: {
		type: Number,
		max: [2022, "Must not be greater than 2022."],
		required,
	},
	isbn: {
		type: String,
		required,
		unique: [true, "ISBN must be unique."],
	},
	price: {
		type: Number,
		required,
		min: [0, "Price most not be less than 0."],
	},
	createdAt: {
		type: Date,
		required,
	},
	lastUpdatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Books", books); // Collection name is books, this is the name of the name of the collection in the database
