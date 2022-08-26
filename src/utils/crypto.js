const bcrypt = require("bcrypt");
const saltRounds = 10;

//will encrypt the target (string, text, password etc..)
async function encrypt(target) {
   return new Promise((resolve, reject) => {
      bcrypt.hash(target, saltRounds, function (err, hash) {
         return resolve(hash);
      });
   });
}

module.exports = { encrypt };
