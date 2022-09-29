const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const { connectionToMongoDB } = require("./db");

const app = express();
const PORT = process.env.PORT;

// Connecting to mongodb instance.
connectionToMongoDB();

app.use(logger("dev"));
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send("Welcome Home.");
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}.`));
