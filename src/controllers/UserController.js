const User = require("../../models/User.js");
const { encrypt } = require("../utils/crypto");
const { userSchema } = require("../../schemas/UserSchema");
const jwtDecode = require("jwt-decode");

const createUser = async function (req, res) {
   const { name, email, password } = req.body;

   try {
      const checkIfUserIsValid = await userSchema.validate(req.body);

      if (checkIfUserIsValid.error) {
         throw new Error(checkIfUserIsValid.error);
      }

      const doesUserExist = await User.exists({ email: email });

      if (doesUserExist) throw new Error("usuário já existente");

      let encryptedPassword;
      await encrypt(password).then((res) => {
         encryptedPassword = res;
      });

      const newUser = {
         name,
         email,
         password: encryptedPassword,
         wallet: { money: 1000 },
      };

      await User.create(newUser);
      res.status(200).send(newUser);
   } catch (err) {
      console.log(err);
      res.status(401).send({ error: err.message });
   }
};

const getUser = async (req, res) => {
   try {
      const token = req.headers["x-access-token"];

      if (token) {
         const userDecode = jwtDecode(token);
         const userId = userDecode._id;
         const { name, email, wallet } = await User.findById(userId);

         const userInfo = {
            name,
            wallet,
         };

         return res.status(200).json(userInfo);
      } else {
         res.status(401).json({
            error: "Erro de autenticação por token inválido ou expirado, por favor, refaça seu login",
         });
      }
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const getUserWallet = async (req, res) => {
   try {
      const token = req.headers["x-access-token"];

      if (token) {
         const userDecode = jwtDecode(token);
         const userId = userDecode._id;
         const { wallet } = await User.findById(userId);

         return res.status(200).json(wallet);
      } else {
         res.status(401).json({
            error: "Erro de autenticação por token inválido ou expirado, por favor, refaça seu login",
         });
      }
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = {
   createUser,
   getUser,
   getUserWallet,
};
