require("dotenv").config();

const CONFIG = {
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: process.env.DB_DIALECT,
};

module.exports = CONFIG;
