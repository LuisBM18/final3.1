const faker = require("faker")
const crypto = require("crypto");
const boom = require("@hapi/boom");

class PedidoService{
  constructor(){
    this.pedido= [];
    this.GenerarDatos(3);
  }

  GenerarDatos(limite) {
    for (let index = 0; index < limite; index++) {
      this.pedido.push({
        id: crypto.randomUUID(),
        cliente: faker.name.firstName(),
        estado: "Por entregar",
        condicion: "Delivery",
        precioTotal: faker.datatype.number(),
        estaBloqueado: Math.random() < 0.75
      });
    }
  }

  async create(Pedido){
    Pedido.id = crypto.randomUUID();
    this.pedido.push(Pedido)
  }
  async find(){
    return this.pedido;
  }
  async finfOne(id){
    const Pedido = this.pedido.find((Pedido) =>{
      return Pedido.id === id;
    });
    if (!Pedido) {
      throw boom.notFound("Pedido no encontrado");
    }
    if (!Pedido.estaBloqueado) {
      throw boom.forbidden("Pedido bloqueado");
    }
    return Pedido;
  }
  async update(id, changes){
    const index = this.pedido.findIndex(pedido =>{
      return pedido.id === id;
    });
    if(index===-1){
      throw new Error('pedido no encontrado');
    }
    const pedido = this.pedido[index];
      this.pedido[index] = {
        ...pedido,
        ...changes
    };
    return this.pedido[index];
  }
  async delete(id){
    const posicion = this.pedido.findIndex(item => item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Pedido no encontrado");
    }
    this.pedido.splice(posicion, 1);
    return {
      mensaje: "Pedido eliminado",
      id
    };
  }
}

module.exports = PedidoService;
