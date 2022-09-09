const User = require("../../models/User.js");
const Transaction = require("../../models/Transaction.js");
const jwtDecode = require("jwt-decode");

const { getBTCCurrency } = require("./CurrencyController");
const { calculateMonetaryValue } = require("../utils/calculator");

const getUserTransactions = async function (req, res) {
   const token = req.headers["x-access-token"];
   const userDecode = jwtDecode(token);

   try {
      const user = await User.findOne({ _id: userDecode._id });
      const transactions = await Transaction.find({ userId: user._id });

      return res.status(200).json(transactions);
   } catch (err) {
      return res.status(500).json({ message: err.message });
   }
};

const registerNewPokemon = async function (req, res) {
   const token = req.headers["x-access-token"];

   if (token) {
      const userDecode = jwtDecode(token);
      const { pokemonId, baseExperience, pokemonName } = req.body;

      try {
         const user = await User.findOne({ _id: userDecode._id });

         const btcCurrencyAtAcquisition = await getBTCCurrency();

         const transactionValueInUSD = calculateMonetaryValue(
            baseExperience,
            btcCurrencyAtAcquisition
         );

         const newTransaction = {
            pokemonId,
            baseExperience,
            pokemonName,
            btcCurrencyAtAcquisition,
            acquisitionDate: new Date(),
            acquisitionUSDValue: transactionValueInUSD,
            userId: user._id,
         };

         if (Number(user.wallet.money) >= transactionValueInUSD) {
            const withdraw = user.wallet.money - transactionValueInUSD;
            Transaction.create(newTransaction).then((transactionResponse) => {
               user.updateOne({ wallet: { money: withdraw } }).then((data) => {
                  res.status(200).json(transactionResponse);
               });
            });
         } else {
            return res.status(400).send("You don't have enough money");
         }
      } catch (err) {
         console.log(err);
         res.status(401).send({ error: err.message });
      }
   }
};

const registerSellPokemon = async function (req, res) {
   const token = req.headers["x-access-token"];

   if (token) {
      const userDecode = jwtDecode(token);
      const { transactionId } = req.body;

      try {
         const user = await User.findOne({ _id: userDecode._id });
         const btcCurrency = await getBTCCurrency();

         const transaction = await Transaction.findOne({ _id: transactionId });

         if (!transaction || transaction.sellDate) {
            throw new Error("Invalid Request");
         }

         const transactionValueInUSD = calculateMonetaryValue(
            transaction.baseExperience,
            btcCurrency
         );

         const updatedTransaction = {
            btcCurrencyAtSell: btcCurrency,
            sellDate: new Date(),
            sellUSDValue: transactionValueInUSD,
         };

         Transaction.findOneAndUpdate(
            { _id: transactionId },
            updatedTransaction
         ).then((transaction) => {
            const deposit = user.wallet.money + transactionValueInUSD;
            user.updateOne({ wallet: { money: deposit } }).then((data) => {
               res.status(200).json("Pokemon sold.");
            });
         });
      } catch (err) {
         console.log(err);
         res.status(401).send({ error: err.message });
      }
   }
};
module.exports = {
   getUserTransactions,
   registerNewPokemon,
   registerSellPokemon,
};
