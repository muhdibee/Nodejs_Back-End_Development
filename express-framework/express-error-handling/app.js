const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(logger("dev"));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
