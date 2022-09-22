const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Add a static middleware to serve static files from the public directory.
app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
