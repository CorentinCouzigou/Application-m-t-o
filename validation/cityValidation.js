const Joi = require('joi');

const schema = Joi.object({
    city: Joi.string().regex(/^[a-zA-Z]+$/).min(1).max(30).required()
})

module.exports = schema;