const { Router } = require("express");
const router = Router();
const { authCheck } = require("../middlewares/authMiddleware");

const {
   getAllPokemons,
   getPokemonInfo,
} = require("../controllers/PokemonController");

router.get("/", async (req, res) => {
   getAllPokemons(req, res);
});
router.post("/", async (req, res) => {
   getPokemonInfo(req, res);
});

module.exports = router;
