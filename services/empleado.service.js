const faker = require("faker")
const crypto = require("crypto");
const boom = require("@hapi/boom");

class EmpleadoService{
  constructor(){
    this.empleado= [];
    this.GenerarDatos(3);
  }

  GenerarDatos(limite) {
    for (let index = 0; index < limite; index++) {
      this.empleado.push({
        id: crypto.randomUUID(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: Math.floor(Math.random() * (30 - 1)) + 1,
        usuario: faker.internet.email(),
        estaBloqueado: Math.random() < 0.75
      });
    }
  }

  async create(Empleado){
    Empleado.id = crypto.randomUUID();
    this.empleado.push(Empleado)
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
