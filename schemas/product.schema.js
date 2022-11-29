const Joi = require('joi')

const id = Joi.string().uuid()
const nombre = Joi.string().min(1).max(30);
const precio = Joi.number().integer().min(3);

const crearProductoSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required()
});

const actualizarProductoSchema = Joi.object({
  nombre,
  precio,
})

const findByProductoSchema = Joi.object({
  id: id.required()
})
module.exports = {crearProductoSchema,actualizarProductoSchema,findByProductoSchema}
