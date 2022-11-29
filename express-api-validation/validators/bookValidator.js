const joi = require("joi");

const bookSchema = joi.object({
	title: joi.string().min(5).max(255).required(),
	shortDescription: joi.string().min(5).max(255).optional(),
	year: joi.number().min(1900).max(Date.now()).required(),
	isbn: joi.string().min(10).max(15).required(),
	price: joi.number().min(0).required(),
});

const validateBook = async (req, res, next) => {
	const bookPayload = req.body;
	try {
		await bookSchema.validateAsync(bookPayload);
		next();
	} catch (err) {
		console.log("Error", err.details[0].message);
		return res.status(406).send(err.details[0].message);
	}
};

module.exports = validateBook;
