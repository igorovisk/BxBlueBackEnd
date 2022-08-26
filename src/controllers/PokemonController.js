const { pokemonApi } = require("../api/api");
const { getBTCCurrency } = require("./CurrencyController");
const { calculateMonetaryValue } = require("../utils/calculator");

const getAllPokemons = async (req, res) => {
   // Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API. By default, a list "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?limit=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60.
   try {
      //Array of Pokemons with an url.
      const pokemons = await pokemonApi.get("pokemon?limit=0&offset=60");

      //mapping each pokemon to fetch individual data, such as name, type, image, etc.
      const pokemonsData = pokemons.data.results;

      const pagination = {
         previousPage: pokemons.data.previous,
         nextPage: pokemons.data.next,
      };
      const btcCurrencyAtAcquisition = await getBTCCurrency();
      Promise.all(
         pokemonsData.map(async (pokemon) => {
            return await pokemonApi
               .get(`${pokemon.url}`)
               .then(async (individualData) => {
                  const pokemonValueInUSD = calculateMonetaryValue(
                     individualData.data.base_experience,
                     btcCurrencyAtAcquisition
                  );
                  const types = individualData.data.types.map((types) => {
                     return types.type.name;
                  });
                  console.log(types);
                  return {
                     id: individualData.data.id,
                     pokemonValueInUSD: pokemonValueInUSD,
                     baseExperience: individualData.data.base_experience,
                     image: individualData.data.sprites.front_default,
                     name: individualData.data.name,
                     types: types,
                  };
               });
         })
      ).then((pokemonList) => {
         return res.status(200).json({ pokemonList, pagination });
      });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const getPokemonInfo = async (req, res) => {
   try {
      const { id, baseExperience } = req.body;
      //Array of Pokemons with an url.
      const searchPokemonById = await pokemonApi.get(`/pokemon/${id}`);
      const btcCurrency = await getBTCCurrency();

      const transactionValueInUSD = calculateMonetaryValue(
         baseExperience,
         btcCurrency
      );

      //mapping each pokemon to fetch individual data, such as name, type, image, etc.
      const pokemonData = searchPokemonById.data;

      const pokemonObj = {
         baseExperience: pokemonData.base_experience,
         pokemonName: pokemonData.name,
         pokemonId: pokemonData.id,
         pokemonImage: pokemonData.sprites.front_default,
         pokemonCurrentValue: transactionValueInUSD,
      };

      return res.status(200).json(pokemonObj);
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};
module.exports = { getAllPokemons, getPokemonInfo };
