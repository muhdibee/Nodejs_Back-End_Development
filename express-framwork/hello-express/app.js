const express = require("express");

const app = express();

const HOSTNAME = "0.0.0.0";
const PORT = 3000;

app.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "Hello World." });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
