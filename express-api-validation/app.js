const express = require("express");
const rate_limiter = require("express-rate-limit");
const db = require("./db");
const booksRoute = require("./routes/booksRouter");

const PORT = 3000;
const app = express();

// Defaults to in-memory store.
// You can use redis or any other store.
const limiter = rate_limiter({
	WindowMs: 15 * 60 * 1000, // 15 minutes.
	max: 100, // Limits each IP address to 100 request per 'window' (in this example window
	//is 15 minutes as in 'windowMs' above)
	standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
	legacyHeaders: false, // Disable the 'x-RateLimit-*' headers
});

// Connect to MongoDB
db.connectToMongoDB();

// Apply rate limit middleware in the app level.
app.use(limiter);

app.use(express.static("public"));
app.use(express.json());

app.use("/books", booksRoute);

app.get("/", (req, res) => {
	res.end("Home Page");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
