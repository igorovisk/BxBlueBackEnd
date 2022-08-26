const mongoose = require("mongoose");

const User = mongoose.model("User", {
   name: String,
   email: String,
   password: String,
   wallet: Object,
});

module.exports = User;
