const userRoutes = require("./UserRoutes");
const authRoutes = require("./AuthRoutes");
const transactionRoutes = require("./TransactionRoutes");
const pokemonRoutes = require("./PokemonRoutes");

module.exports = {
   users: userRoutes,
   auth: authRoutes,
   transactions: transactionRoutes,
   pokemons: pokemonRoutes,
};
