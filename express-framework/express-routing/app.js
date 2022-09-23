const express = require("express");
const logger = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(logger("dev"));

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
	console.log(`App listening on port ${PORT}`);
});
