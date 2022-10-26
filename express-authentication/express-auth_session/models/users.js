const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//Define user schema.
const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// Automatically handles hashing and salting of passwords
// and adds the following properties to the user object / userSchema:
//   - password
//   - salt
//   - hash

UserSchema.plugin(passportLocalMongoose);

// Create a mongoose userModel.
const UserModel = mongoose.model("Users", UserSchema); //collection name is Users. This is the name of the collection in the database.

// Export the model as a module.
module.exports = UserModel;
