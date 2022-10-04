const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const bookRouter = require("./routes/books");

const PORT = process.env.PORT || 300;

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use("/books", bookRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the book API");
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		error: err.message,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
