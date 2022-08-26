const { Router } = require("express");
const router = Router();
const { authCheck } = require("../middlewares/authMiddleware");

const {
   getUserTransactions,
   registerNewPokemon,
   registerSellPokemon,
} = require("../controllers/TransactionController");

router.get("/", async (req, res) => {
   getUserTransactions(req, res);
});

router.post("/pokemon/buy", async (req, res) => {
   registerNewPokemon(req, res);
});

router.post("/pokemon/sell", async (req, res) => {
   registerSellPokemon(req, res);
});

module.exports = router;
