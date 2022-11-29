const express = require('express');
const controlValidar = require('../middlewares/validar.middleware');
const {crearUsuarioSchema,actualizarUsuarioSchema,findByUsuarioSchema} = require("../schemas/usuario.schema");
const router = express.Router();
const UsuarioService = require('../services/usuario.service');
const service = new UsuarioService();

router.get('/',async (req, res, next)=>{
  try {
    const Usuario = await service.find();
    res.status(200).json(Usuario);
    } catch (error) {
      next(error)
    }
  });

router.get('/:id', controlValidar(findByUsuarioSchema, 'params'), async (req,res, next)=>{
  try {
    const { id } = req.params;
    const Usuario = await service.finfOne(id);
    res.json(Usuario);
  } catch (error) {
    next(error);
  }
});

router.post('/', controlValidar(crearUsuarioSchema, 'body'), async (req, res, next)=>{
  try {
    const body = req.body;
    const usuario = await service.create(body);
    res.status(201).json({
      mensaje: 'registro exitoso',
      datos: usuario
    });
  } catch (error) {
    next(error)
  }
});
router.patch('/:id',controlValidar(findByUsuarioSchema, 'params'), controlValidar(actualizarUsuarioSchema, 'body'), async (req,res, next) => {
  try {
    const { id }= req.params;
      const body = req.body;
      const Usuario =await service.update(id,body);
      res.status(200).json({
        mensaje: 'Usuario actualizado',
        Usuario
      });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',controlValidar(findByUsuarioSchema, 'params'), async (req,res, next)=> {
  try {
    const {id} = req.params;
    const UsuarioEliminado = await service.delete(id);
    res.json({
    mensaje :'perfil de usuario eliminado',
    UsuarioEliminado
    });
  } catch (error) {
    next(error)
  }
});
module.exports = router;
