const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const PORT = 3000;

const users = [
	{
		id: 1,
		name: "John",
		age: 30,
	},
	{
		id: 2,
		name: "Jane",
		age: 25,
	},
];

const posts = [
	{
		id: 1,
		title: "Post 1",
		body: "This is post 1",
	},
	{
		id: 2,
		title: "Post 2",
		body: "This is post 2",
	},
];

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.end("Home Page");
});

app.get("/about", (req, res) => {
	res.end("About Page");
});

// Grab single param from a url using colon
app.use("/users/:id", (req, res) => {
	const id = req.params.id;

	const user = users.find((user) => user.id === parseInt(id));
	if (user) {
		res.send(user);
	} else {
		res.status(404);
		res.end("User not found");
	}
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
