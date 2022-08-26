const { getBTCCurrency } = require("../controllers/CurrencyController");

function calculateMonetaryValue(baseExperience, BTCCurrencyInDolarsAtTrade) {
   const satochi = 0.00000001; //BTC

   const BTCPokemon = baseExperience * satochi;
   const USDPokemon = Number(BTCPokemon * BTCCurrencyInDolarsAtTrade);

   return USDPokemon;
}

module.exports = { calculateMonetaryValue };
