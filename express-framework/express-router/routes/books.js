const express = require("express");

const booksRouter = express.Router();

const books = [
	{
		title: "War and Peace",
		id: 1,
		year: 1869,
	},
	{
		title: "The Great Gatsby",
		id: 2,
		year: 1925,
	},
	{
		title: "The Catcher in the Rye",
		id: 3,
		year: 1951,
	},
];

booksRouter.get("/", (req, res) => {
	res.json(books);
});

booksRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const book = books.find((book) => book.id == id);

	if (!book) {
		res.status(404).end("Book not found");
		return;
	}

	res.json(book);
});

booksRouter.post("/", (req, res) => {
	const book = req.body;
	books.push(book);
	res.json(book);
});

booksRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const book = req.body;
	const index = books.findIndex((book) => book.id == id);

	if (index == -1) {
		res.status(404).end("Book not found");
		return;
	}

	books[index] = book;
	res.json(book);
});

booksRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const index = books.findIndex((book) => book.id == id);
	if (index == -1) {
		res.status(404).end("Book not found");
		return;
	}

	books.splice(index, 1);
	res.json(books);
});

module.exports = booksRouter;
