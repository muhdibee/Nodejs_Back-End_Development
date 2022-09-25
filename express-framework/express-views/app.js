const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const booksRoute = require("./routes/books");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/books", booksRoute);

app.get("/", (req, res) => {
	res.render("index", { user: "Muhammad" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
