const { Router } = require("express");
const router = Router();

const {
   createUser,
   getUser,
   getUserWallet,
} = require("../controllers/UserController");
const { authCheck } = require("../middlewares/authMiddleware");

router.post("/", async (req, res) => {
   createUser(req, res);
});

router.get("/", authCheck, async (req, res) => {
   getUser(req, res);
});

router.get("/wallet", authCheck, async (req, res) => {
   getUserWallet(req, res);
});
module.exports = router;
