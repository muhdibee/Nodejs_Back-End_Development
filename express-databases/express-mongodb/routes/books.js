const express = require("express");
const Books = require("../models/books");

const booksRouter = express.Router();

// Function for returning error.
const returnError = (error, req, res, errorType) => {
	if (errorType == "Not found") {
		res.status(404).send(errorType);
		console.log(error);
	} else if (errorType == "Server error") {
		res.status(500).send(errorType);
		console.log(error);
	}
};

// Get all books
booksRouter.get("/", (req, res) => {
	Books.find({})
		.then((books) => {
			res.send(books);
		})
		.catch((error) => returnError(error, "Server error"));
});

// Get a single book by ID.
booksRouter.get("/:id", (req, res) => {
	const bookId = req.params.id;

	if (bookId) {
		Books.findById(bookId)
			.then((book) => {
				res.status(200).send(book);
			})
			.catch((error) => returnError(error, "Not found"));
	} else {
		res.status(404).send("Route not found");
	}
});

// Add a book.
booksRouter.post("/", (req, res) => {
	const book = req.body;
	if (book) {
		book.createdAt = new Date(); // Set the current date.
		Books.create(book)
			.then((book) => {
				res.status(201).send(book);
			})
			.catch((error) => returnError(error, req, res, "Server error"));
	}
});

// Update a book.
booksRouter.put("/:id", (req, res) => {
	const bookId = req.params.id;
	const bookUpdate = req.body;
	bookUpdate.lastUpdatedAt = new Date(); //Set lastUpdatedAt to current date.
	Books.findByIdAndUpdate(bookId, bookUpdate, { new: true })
		.then((updatedBook) => {
			res.status(200).send(updatedBook);
		})
		.catch((error) => returnError(error, "Server error"));
});

// Delete a book.
booksRouter.delete("/:id", (req, res) => {
	const bookId = req.params.id;
	Books.findByIdAndRemove(bookId)
		.then((book) => {
			res.status(200).send(book);
		})
		.catch((error) => returnError(error, "Server error"));
});

// Export books router.
module.exports = booksRouter;
