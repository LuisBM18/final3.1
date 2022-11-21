const Joi = require('joi')

const id = Joi.string().uuid()
const nombre = Joi.string().min(1).max(30);
const apellido = Joi.string().min(1).max(30);
const edad = Joi.number().integer().min(2);
const usuario = Joi.string().email();

const crearEmpleadoSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  edad: edad,
  usuario: usuario,
})

const actualizarEmpleadoSchema = Joi.object({
  nombre,
  apellido,
  edad,
  usuario,
})

const findByEmpleadoSchema = Joi.object({
  id: id.required()
})
module.exports = {crearEmpleadoSchema,actualizarEmpleadoSchema,findByEmpleadoSchema}
