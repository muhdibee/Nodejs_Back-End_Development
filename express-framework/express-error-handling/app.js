const express = require("express");
const fsPromises = require("fs").promises;
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(logger("dev"));

// Synchronous error is automatically handled by express
app.get("/", (req, res) => {
	throw new Error("Hello error!");
});

// Asynchronous error is not handled by express.
app.get("/file", async (req, res) => {
	const file = await fsPromises.readFile("./no-such-file.txt");
	res.sendFile(file);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
