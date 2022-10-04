const db = require("../models/index.js");

// Get book model
const BookModel = db.books;

// Add CRUD controller function.
async function getBooks(req, res, next) {
	try {
		const books = BookModel.findAll();
		res.status(200).send(books);
	} catch (err) {
		next(err);
	}
}

async function getBookById(req, res, next) {
	const bookId = req.params.id;
	try {
		const book = BookModel.findByPK(bookId);
		res.status(200).json(book);
	} catch (err) {
		next(err);
	}
}

async function addBook(req, res, next) {
	const book = req.body;
	try {
		const books = BookModel.create(book);
		res.status(201).json(books);
	} catch (err) {
		next(err);
	}
}

async function updateBook(req, res, next) {
	const bookId = req.params.id;
	const bookUpdate = req.body;
	try {
		const book = BookModel.findByPk(bookId);
		if (book) {
			await book.update(bookUpdate);
			res.status(200).json(book);
		} else {
			res.status(404).json({ message: "Book not found." });
		}
	} catch (err) {
		next(err);
	}
}

async function deleteBook(req, res, next) {
	const bookId = req.params.id;
	try {
		const book = BookModel.findByPk(bookId);
		if (book) {
			await book.destroy();
			res.status(200).json(book);
		} else {
			res.status(404).json({ message: "Book not found." });
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	addBook,
	getBooks,
	getBookById,
	updateBook,
	deleteBook,
};
