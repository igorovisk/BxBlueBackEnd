const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const bitcoinApi = axios.create({
   baseURL: process.env.BTC_CURRENCY_API,
});
const pokemonApi = axios.create({
   baseURL: process.env.POKEMON_API,
});

module.exports = { bitcoinApi, pokemonApi };
