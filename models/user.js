const mongoose = require("mongoose"); // mongoose is a peer dependency.
// var mongooseUniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // index: true,
    // unique: true,
  },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

// userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("User", userSchema);
