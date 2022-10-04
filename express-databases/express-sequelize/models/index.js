const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
});

// Test sequelize connection to DB.
sequelize
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.log("Unable to connect to the database: ", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add our tables
db.books = require("./book")(sequelize, DataTypes);

// sync all models.
// force: false will not drop the table if it already exists.
db.sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Database & tables synced");
	})
	.catch((err) => {
		console.error("Unable to sync database & tables:", err);
	});

module.exports = db;
