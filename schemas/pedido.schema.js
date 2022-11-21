const Joi = require('joi')

const id = Joi.string().uuid()
const cliente = Joi.string().min(1).max(30);
const estado = Joi.string().min(1).max(30);
const condicion = Joi.string().min(1).max(30);
const precioTotal = Joi.number().integer().min(3);

const crearPedidoSchema = Joi.object({
  cliente: cliente.required(),
  estado: estado.required(),
  condicion: condicion,
  precioTotal: precioTotal.required(),
})

const actualizarPedidoSchema = Joi.object({
  cliente,
  estado,
  condicion,
  precioTotal,
})

const findByPedidoSchema = Joi.object({
  id: id.required()
})
module.exports = {crearPedidoSchema,actualizarPedidoSchema,findByPedidoSchema}
