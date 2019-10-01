const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  title: String,
  desc: String
})

module.exports = mongoose.model("TodoItem", UserSchema)