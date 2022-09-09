const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

const login = async function (req, res) {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({
         email: email,
      });

      //TODO check user email

      if (!user) {
         throw new Error("Usuário inválido");
      }
      if (await bcrypt.compare(password, user.password)) {
         const token = await jwt.sign(
            { name: user.name, email: email, _id: user._id },
            secret,
            {
               expiresIn: "60h",
            }
         );
         const today = new Date();
         return res.status(200).json({
            email: email,
            token,
            name: user.name,
            auth: true,
            _id: user._id,
            expirationDate: new Date().setHours(today.getHours() + 60),
         });
      } else {
         throw new Error("Invalid Credentials");
      }
   } catch (err) {
      return res.status(401).json({ auth: false, error: err.message });
   }
};

module.exports = { login };
