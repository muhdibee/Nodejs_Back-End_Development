const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.

UserSchema.pre("save", async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 10);
	user.password = hash;
});

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
