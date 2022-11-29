const crypto = require('crypto');
const boom = require("@hapi/boom");

class productoService{

constructor(){
  this.productos=[];
  this.generate(3);
}
generate(limite){
  for (let index = 0;index<limite;index++){
    this.productos.push({
      id:crypto.randomUUID(),
      nombre:'producto'+index,
      precio: 10 + Math.floor(Math.random()*190),
      estaBloqueado: Math.random() < 0.75
    });
  }
}

async create(Producto){
  Producto.id = crypto.randomUUID();
  this.productos.push(Producto)
}
async find(){
  return this.productos;
}
async finfOne(id){
  const Producto = this.productos.find((Producto) =>{
    return Producto.id === id;
  });
  if (!Producto) {
    throw boom.notFound("Producto no encontrado");
  }
  if (!Producto.estaBloqueado) {
    throw boom.forbidden("Producto bloqueado");
  }
  return Producto;
}
async update(id, changes){
  const index = this.productos.findIndex(producto =>{
    return producto.id === id;
  });
  if(index===-1){
    throw new Error('Producto no encontrado');
  }
  const producto = this.productos[index];
    this.productos[index] = {
      ...producto,
      ...changes
  };
  return this.productos[index];
}
async delete(id){
  const posicion = this.productos.findIndex(item => item.id == id);
  if (posicion === -1) {
    throw boom.notFound("Producto no encontrado");
  }
  this.productos.splice(posicion, 1);
  return {
    mensaje: "Producto eliminado",
    id
  };
}
}
module.exports = productoService;
