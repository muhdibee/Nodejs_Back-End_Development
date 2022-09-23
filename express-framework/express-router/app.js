const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const booksRoute = require("./routes/books");

const PORT = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/books", booksRoute);

app.get("/", (req, res) => {
	res.end("Home Page");
});

app.get("/about", (req, res) => {
	res.end("About Page");
});

app.get("/contact", (req, res) => {
	res.end("Contact Page");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
