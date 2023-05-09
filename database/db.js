const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectToDatabase() {
   await mongoose
      .connect(process.env.DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to database"))
      .catch((err) => console.error("Error connecting to database", err));
}
module.exports = { connectToDatabase };
