const mongoose = require("mongoose");
let { Schema } = mongoose;
let user = new Schema(
  {
    name: String,
    age: Number,
  },
  { collection: "Users" }
);

module.exports = mongoose.model("users", user);
