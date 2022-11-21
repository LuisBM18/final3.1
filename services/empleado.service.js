const faker = require("faker")
const crypto = require("crypto");
const boom = require("@hapi/boom");

class EmpleadoService{
  constructor(){
    this.empleado= [];
    this.GenerarDatos(10);
  }

  GenerarDatos(limite) {
    for (let index = 0; index < limite; index++) {
      this.empleado.push({
        id: crypto.randomUUID(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: Math.floor(Math.random() * (30 - 1)) + 1,
        usuario: faker.internet.email(),
        estaBloqueado: Math.random() < 0.25
      });
    }
  }

  async create(data) {
    const crearNuevoEmpleado ={
      id : crypto.randomUUID(),
      ...data
    }
    this.empleado.push(crearNuevoEmpleado);
    return crearNuevoEmpleado;
  }
  async find(){
    return this.empleado;
  }
  async finfOne(id){
    const Empleado = this.empleado.find((Empleado) =>{
      return Empleado.id === id;
    });
    if (!Empleado) {
      throw boom.notFound("Empleado no encontrado");
    }
    if (!Empleado.estaBloqueado) {
      throw boom.forbidden("Empleado bloqueado");
    }
    return Empleado;
  }
  async update(id, changes){
    const index = this.empleado.findIndex(empleado =>{
      return empleado.id === id;
    });
    if(index===-1){
      throw new Error('Empleado no encontrado');
    }
    const empleado = this.empleado[index];
      this.empleado[index] = {
        ...empleado,
        ...changes
    };
    return this.empleado[index];
  }
  async delete(id){
    const posicion = this.empleado.findIndex(item => item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Empleado no encontrado");
    }
    this.empleado.splice(posicion, 1);
    return {
      mensaje: "Empleado eliminado",
      id
    };
  }
}

module.exports = EmpleadoService;
