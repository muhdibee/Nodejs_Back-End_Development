module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		"Book",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			shortDescription: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isbn: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ tableName: "books" }
	);
	return Book;
};
