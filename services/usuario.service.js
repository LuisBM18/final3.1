const crypto = require('crypto');
const faker = require('faker');
const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');

class UsuarioService{

constructor(){
  
}


async create(data) {
  const crearNuevoUsuario ={
    id : crypto.randomUUID(),
    ...data
  }
  const salida = await models.usuario.create(crearNuevoUsuario);
  return salida;
}
async find(){
  const salida = await models.usuario.findAll();
  return salida;
  // return this.empleado;
}
async finfOne(id){
  const data = await models.usuario.findByPk(id);
  return data;
  // const Empleado = this.empleado.find((Empleado) =>{
  //   return Empleado.id === id;
  // });
  // if (!Empleado) {
  //   throw boom.notFound("Empleado no encontrado");
  // }
  // if (!Empleado.estaBloqueado) {
  //   throw boom.forbidden("Empleado bloqueado");
  // }
  // return Empleado;
}
async update(id, changes){
  const usuario = await this.finfOne(id);
  const salida = await usuario.update(changes);
  return salida;
  // const index = this.empleado.findIndex(empleado =>{
  //   return empleado.id === id;
  // });
  // if(index===-1){
  //   throw new Error('Empleado no encontrado');
  // }
  // const empleado = this.empleado[index];
  //   this.empleado[index] = {
  //     ...empleado,
  //     ...changes
  // };
  // return this.empleado[index];
}
async delete(id){
  const usuario = await this.finfOne(id);
  await usuario.destroy();
  return { id };
//   const posicion = this.empleado.findIndex(item => item.id == id);
//   if (posicion === -1) {
//     throw boom.notFound("Empleado no encontrado");
//   }
//   this.empleado.splice(posicion, 1);
//   return {
//     mensaje: "Empleado eliminado",
//     id
//   };
}
}
module.exports = UsuarioService;
