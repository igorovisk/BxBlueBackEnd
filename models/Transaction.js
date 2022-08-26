const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Transaction = mongoose.model("Transaction", {
   pokemonId: Number,
   baseExperience: Number,
   pokemonName: String,
   btcCurrencyAtAcquisition: String,
   acquisitionDate: Date,
   acquisitionUSDValue: Number,
   btcCurrencyAtSell: String,
   sellDate: Date,
   sellUSDValue: Number,
   userId: ObjectId,
});

module.exports = Transaction;
