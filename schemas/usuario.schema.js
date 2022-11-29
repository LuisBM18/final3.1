const Joi = require('joi')

const id = Joi.string().uuid()
const correo = Joi.string().email();
const Password = Joi.string().min(1).max(30);

const crearUsuarioSchema = Joi.object({
  correo: correo.required(),
  Password: Password.required(),
})

const actualizarUsuarioSchema = Joi.object({
  correo,
  Password,
})

const findByUsuarioSchema = Joi.object({
  id: id.required()
})
module.exports = {crearUsuarioSchema,actualizarUsuarioSchema,findByUsuarioSchema}
