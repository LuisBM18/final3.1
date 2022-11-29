const { Model, Sequelize, DataTypes } = require('sequelize');

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class usuario extends Model {
  static associate(){
    
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'usuario',
      timestamps: false
    };
  }
}
module.exports= { USUARIO_TABLE, UsuarioSchema, usuario }
