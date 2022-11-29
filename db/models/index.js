const { EMPLEADO_TABLE, EmpleadoSchema, Empleado } = require('./empleados.model');
const { USUARIO_TABLE, UsuarioSchema, usuario } = require('./usuario.model');

function setupModels(sequelize){
  Empleado.init(EmpleadoSchema, Empleado.config(sequelize));
  Empleado.associate(sequelize.models);
  usuario.init(UsuarioSchema, usuario.config(sequelize));
  usuario.associate(sequelize.models);
}


module.exports = {setupModels}
