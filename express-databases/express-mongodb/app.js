const express = require("express");
const logger = require("morgan");
const { connectionToMongoDB } = require("./db");
require("dotenv").config();
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT;

// Connecting to mongodb instance.
connectionToMongoDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use("/books", booksRouter);

app.get("/", (req, res) => {
	res.status(200).send("Welcome Home.");
});

// Handle all other undefined routes.
app.get("*", (req, res) => {
	const url = req.url;
	res.status(400).send(`Route ${url} not found.`);
});

app.post("*", (req, res) => {
	const url = req.url;
	res.status(400).send(`Route ${url} not found.`);
});

app.put("*", (req, res) => {
	const url = req.url;
	res.status(400).send(`Route ${url} not found.`);
});

app.delete("*", (req, res) => {
	const url = req.url;
	res.status(400).send(`Route ${url} not found.`);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}.`));
