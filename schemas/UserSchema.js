const Joi = require("@hapi/joi");

const userSchema = Joi.object({
   name: Joi.string().min(2).required(),
   email: Joi.string().email().lowercase().required(),
   password: Joi.string().min(6).required(),
});

module.exports = {
   userSchema,
};
