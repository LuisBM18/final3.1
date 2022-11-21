const { json } = require("express");
const express = require("express");
const controlValidar = require('../middlewares/validar.middleware');
const {crearEmpleadoSchema,actualizarEmpleadoSchema,findByEmpleadoSchema} = require("../schemas/empleado.schema");

const EmpleadoService = require('../services/empleado.service')
const service = new EmpleadoService();
const router = express.Router();

router.get('/',async (req, res, next)=>{
  try {
    const Empleado = await service.find();
    res.status(200).json(Empleado);
    } catch (error) {
      next(error)
    }
  });

router.get('/:id', controlValidar(findByEmpleadoSchema, 'params'), async (req,res, next)=>{
  try {
    const { id } = req.params;
    const Empleado = await service.finfOne(id);
    res.json(Empleado);
  } catch (error) {
    next(error);
  }
});

router.post('/', controlValidar(crearEmpleadoSchema, 'body'), async (req, res, next)=>{
  try {
    const body = req.body;
    const empleado = await service.create(body);
    res.status(201).json({
      mensaje: 'registro exitoso',
      datos: empleado
    });
  } catch (error) {
    next(error)
  }
});
router.patch('/:id',controlValidar(findByEmpleadoSchema, 'params'), controlValidar(actualizarEmpleadoSchema, 'body'), async (req,res, next) => {
  try {
    const { id }= req.params;
      const body = req.body;
      const Empleado =await service.update(id,body);
      res.status(200).json({
        mensaje: 'Empleado actualizado',
        Empleado
      });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',controlValidar(findByEmpleadoSchema, 'params'), async (req,res, next)=> {
  try {
    const {id} = req.params;
    const EmpleadoEliminado = await service.delete(id);
    res.json({
    mensaje :'Empleado eliminado',
    EmpleadoEliminado
    });
  } catch (error) {
    next(error)
  }
});
module.exports = router;
