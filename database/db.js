const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectToDatabase() {
   await mongoose.connect(process.env.DATABASE_URL).then((res) => {
      console.log("Connected to MongoDB");
   });
}

module.exports = { connectToDatabase };
