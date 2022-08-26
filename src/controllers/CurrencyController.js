const { default: axios } = require("axios");
const { bitcoinApi } = require("../api/api");

const getBTCCurrency = async (req, res) => {
   try {
      const { data } = await bitcoinApi.get("ticker");
      const BTCCurrencyAtTrade = data.USD.last;
      return Number(BTCCurrencyAtTrade).toFixed(2);
   } catch (err) {
      return res.status(400).json({
         error: err.message,
      });
   }
};

module.exports = { getBTCCurrency };
