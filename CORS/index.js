const http = require("http");
const path = require("path");
const fs = require("fs");

const bookDbPath = path.join(__dirname, "db", "books.json");
const { authenticateUser } = require("./authentication");

const HOST_NAME = "0.0.0.0"; // The current host ip address can be used to access node server on a LAN.
const PORT = 3000;

//Create a server.
const SERVER = http.createServer((req, res) => {
	//On the second paremeter of the setHeader(), pass in the address you wish to allow
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.30:3001');
	if (req.url === "/books" && req.method === "GET") {
		authenticateUser(req, res)
			.then(() => {
		getAllBooks(req, res);
		})
		.catch((err) => {
			res.writeHead(err.statusCode);
			res.end(JSON.stringify({ message: err.message }));
		});
	} else if (req.url === "/books" && req.method === "POST") {
		// Authenticate user.
		authenticateUser(req, res)
			.then(() => {
				getAllBooks(req, res);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});

		addBook(req, res);
	} else if (req.url === "/books" && req.method === "PUT") {
		// Authenticate user.
		authenticateUser(req, res)
			.then(() => {
				UpdateBook(req, res);
			})
			.catch((err) => {
				res.writeHead(err.statusCode);
				res.end(JSON.stringify({ message: err.message }));
			});
	} else if (req.url === "/books" && req.method === "DELETE") {
		// Authenticate user.
		authenticateUser(req, res)
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
			res.writeHead(500);
			res.end("Error in reading bookDb path");
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}

//Add a book using /books
function addBook(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});
	req.on("end", () => {
		const parsedbody = Buffer.concat(body).toString();
		const newBook = JSON.parse(parsedbody);
		console.log(newBook);
		fs.readFile(bookDbPath, "utf-8", (err, data) => {
			if (err) {
				console(err);
				res.writeHead(500);
				res.end("Error in reading bookDb path");
			} else {
				const currentBooks = JSON.parse(data);
				const updatedBooks = [...currentBooks, newBook];
				console.log("currentBooks: ", currentBooks);
				console.log("updatedBooks:", updatedBooks);

				// update the bookDbPath
				fs.writeFile(bookDbPath, JSON.stringify(updatedBooks), (err) => {
					if (err) {
						res.writeHead(500, "Error in writing to bookDb path");
						console("WriteFile Error: ", err);
					} else {
						res.writeHead(200);
						res.end(JSON.stringify(updatedBooks));
					}
				});
			}
		});
	});
}

//Update a book using /books
function UpdateBook(req, res) {
	const body = [];
	req.on("data", (chunk) => {
		body.push(chunk);
	});
	req.on("end", () => {
		const parsedbody = Buffer.concat(body).toString();
		const bookDetailsToUpdate = JSON.parse(parsedbody);
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
					const updatedBook = {
						...books[IndexOfbookToUpdate],
						...bookDetailsToUpdate,
					};
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
	const body = [];
	req.on("data", (chunk) => {
		body.push(chunk);
	});
	req.on("end", () => {
		const parsedbody = Buffer.concat(body).toString();
		const bookDetailsToDelete = JSON.parse(parsedbody);
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
					//Update books
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
}

//Listen on specific port and host name.
SERVER.listen(PORT, HOST_NAME, () => {
	console.log(`Server started successfully at https://${HOST_NAME}:${PORT}`);
});
