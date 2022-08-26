const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

const authCheck = function (req, res, next) {
   const token = req.headers["x-access-token"];
   jwt.verify(token, secret, (err, decoded) => {
      if (err) {
         res.status(401).json("Favor, logar no sistema.");
      }
      next();
   });
};

module.exports = { authCheck };
