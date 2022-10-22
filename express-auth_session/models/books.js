const mongoose = require("mongoose");

//Define a schema.
const Schema = mongoose.Schema;

//Define book schema.
const BookSchema = new Schema({
	title: {
		type: String,
		required,
	},
	shortDescription: {
		type: String,
	},
	year: {
		type: Number,
		required: true,
	},
	isbn: {
		type: String,
		required: true,
		unique: [true, "ISBN must be unique"], //validation with custom message
	},
	price: {
		type: Number,
		required: true,
		min: [0, "Price must be greater than or equal to 0"], //validation with custom message
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	lastUpdateAt: {
		type: Date,
		default: Date.now,
	},
});

// Create a mongoose BookModel
const BookModel = mongoose.model("Books", BookSchema); //collection name is Books. This is the name of the collection in the database.

// Export the model as a module.
module.exports = BookModel;
