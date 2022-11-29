const faker = require("faker")
const crypto = require("crypto");
const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');

class EmpleadoService{
  constructor(){
  }
  async create(data) {
    const crearNuevoEmpleado ={
      id : crypto.randomUUID(),
      ...data
    }
    const salida = await models.Empleado.create(crearNuevoEmpleado);
    return salida;
  }
  async find(){
    const salida = await models.Empleado.findAll();
    return salida;
    // return this.empleado;
  }
  async finfOne(id){
    const data = await models.Empleado.findByPk(id);
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
    const Empleado = await this.finfOne(id);
    const salida = await Empleado.update(changes);
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
    const Empleado = await this.finfOne(id);
    await Empleado.destroy();
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

module.exports = EmpleadoService;
