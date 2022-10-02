const mongoose = require("mongoose");

// Define a schema
const booksSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	shortDescription: {
		type: String,
		max: [150, "Most not be more than 150 characters."], //validation with custom message
		required: true,
	},
	year: {
		type: Number,
		max: [2022, "Must not be greater than 2022."],
		required: true,
	},
	isbn: {
		type: Number,
		required: true,
		unique: [true, "ISBN must be unique."],
	},
	price: {
		type: Number,
		required: true,
		min: [0, "Price most not be less than 0."],
	},
	createdAt: {
		type: Date,
		required: true,
	},
	lastUpdatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("books", booksSchema); // Collection name is books, this is the name of the name of the collection in the database
