const http = require("http");
const path = require("path");
const fs = require("fs");

const bookDbPath = path.join(__dirname, "db", "books.json");
const { authenticateUser } = require("./authentication");

const HOST_NAME = "0.0.0.0"; // The current host ip address can be used to access node server on a LAN.
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {
	if (req.url === "/books" && req.method === "GET") {
		authenticateUser(req, res, ["admin", "reader"])
			.then(() => {
				getAllBooks(req, res);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});
	} else if (req.url === "/books" && req.method === "POST") {
		authenticateUser(req, res, ["admin"])
			.then((newBook) => {
				addBook(req, res, newBook);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});
	} else if (req.url === "/books" && req.method === "PUT") {
		authenticateUser(req, res, ["admin", "reader"])
			.then(() => {
				UpdateBook(req, res);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});
	} else if (req.url === "/books" && req.method === "DELETE") {
		authenticateUser(req, res, ["admin", "reader"])
			.then(() => {
				deleteBook(req, res);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});
	} else if (req.url === "/" && req.method === "GET") {
		res.writeHead(200);
		res.end("You are welcome");
	} else {
		res.writeHead(404);
		res.end(`Request "${req.url}" not found.`);
	}
});

// Retreive all books using /books
function getAllBooks(req, res) {
	fs.readFile(bookDbPath, "utf-8", async (err, data) => {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end("Error in reading bookDb path");
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}

//Add a book using /books
function addBook(req, res, newBook) {
	//add the new book to the end of the existing books array
	fs.readFile(bookDbPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			res.writeHead(400);
			res.end("An error occured");
		}

		const oldBooks = JSON.parse(data);
		const allBooks = [...oldBooks, newBook];

		fs.writeFile(bookDbPath, JSON.stringify(allBooks), (err) => {
			if (err) {
				console.log(err);
				res.writeHead(500);
				res.end(
					JSON.stringify({
						message: "Internal Server Error. Could not save book to database.",
					})
				);
			}

			res.end(JSON.stringify(newBook));
		});
	});
}
//Update a book using /books
function UpdateBook(req, res) {
	console.log("line 3 ");
	let body = [];
	console.log("line 5 ", body);
	req.on("data", (chunk) => {
		console.log("line 4 ");
		body.push(chunk);
	});
	req.on("end", function () {
		const parsedbody = Buffer.concat(body).toString();
		console.log("line 2 passed body: ", parsedbody);
		const { bookDetails: bookDetailsToUpdate } = JSON.parse(parsedbody);
		console.log("line 1 ");
		fs.readFile(bookDbPath, "utf-8", (err, data) => {
			if (err) {
				console.log(err);
				res.writeHead(500);
				res.end("Fail to read bookDbPath");
			} else {
				const books = JSON.parse(data);
				const IndexOfbookToUpdate = books.findIndex((book) => book.id == bookDetailsToUpdate.id);

				if (IndexOfbookToUpdate == -1) {
					res.writeHead(404);
					res.end("Book not found ");
					return;
				} else {
					const updatedBook = { ...books[IndexOfbookToUpdate], ...bookDetailsToUpdate };
					// Update books
					books[IndexOfbookToUpdate] = updatedBook;
					fs.writeFile(bookDbPath, JSON.stringify(books), (err) => {
						if (err) {
							console.log(err);
							res.writeHead(500);
							res.end("Fail to update bookDbPath.");
						} else {
							console.log("Update success.");
							res.writeHead(200);
							res.end(JSON.stringify(updatedBook));
						}
					});
				}
			}
		});
	});
}

// Delete a book from /books
function deleteBook(req, res) {
	console.log("test 1");
	const body = [];
	req.on("data", (chunk) => {
		body.push(chunk);
	});
	console.log("test 2: ", body);
	req.on("end", async () => {
		const parsedbody = Buffer.concat(body).toString();
		const { bookDetails: bookDetailsToDelete } = JSON.parse(parsedbody);
		fs.readFile(bookDbPath, "utf-8", (err, data) => {
			if (err) {
				console.log(err);
				res.writeHead(500);
				res.end("Fail to read bookDbPath");
			} else {
				const books = JSON.parse(data);
				const IndexOfbookToDelete = books.findIndex((book) => book.id == bookDetailsToDelete.id);

				if (IndexOfbookToDelete == -1) {
					res.writeHead(404);
					res.end("Book not found ");
					return;
				} else {
					//Delete books
					books.splice(IndexOfbookToDelete, 1);

					fs.writeFile(bookDbPath, JSON.stringify(books), (err) => {
						if (err) {
							console.log(err);
							res.writeHead(500);
							res.end("Fail to update bookDbPath.");
						} else {
							console.log("Update success.");
							res.writeHead(200);
							res.end(JSON.stringify(books));
						}
					});
				}
			}
		});
	});
	console.log("test 3", body);
}

//Listen on specific port and host name.
SERVER.listen(PORT, HOST_NAME, () => {
	console.log(`Server started successfully at https://${HOST_NAME}:${PORT}`);
});
