const crypto = require('crypto');
const faker = require('faker');
const boom = require("@hapi/boom");

class UsuarioService{

constructor(){
  this.Usuarios=[];
  this.generate(3);
}
generate(limite){
  for (let index = 0;index<limite;index++){
    this.Usuarios.push({
      id:crypto.randomUUID(),
      Correo: faker.internet.email(),
      Password:faker.internet.password(),
      estaBloqueado: Math.random() < 0.75
    });
  }
}
  async create(Usuario){
    Usuario.id = crypto.randomUUID();
    this.Usuarios.push(Usuario)
  }
  async find(){
    return this.Usuarios;
  }
  async finfOne(id){
    const Usuario = this.Usuarios.find((Usuario) =>{
      return Usuario.id === id;
    });
    if (!Usuario) {
      throw boom.notFound("Usuario no encontrado");
    }
    if (!Usuario.estaBloqueado) {
      throw boom.forbidden("Usuario bloqueado");
    }
    return Usuario;
  }
  async update(id, changes){
    const index = this.Usuarios.findIndex(usuario =>{
      return usuario.id === id;
    });
    if(index===-1){
      throw new Error('usuario no encontrado');
    }
    const usuario = this.Usuarios[index];
      this.Usuarios[index] = {
        ...usuario,
        ...changes
    };
    return this.Usuarios[index];
  }
  async delete(id){
    const posicion = this.Usuarios.findIndex(item => item.id == id);
    if (posicion === -1) {
      throw boom.notFound("Usuario no encontrado");
    }
    this.Usuarios.splice(posicion, 1);
    return {
      mensaje: "Usuario eliminado",
      id
    };
  }
}
module.exports = UsuarioService;
