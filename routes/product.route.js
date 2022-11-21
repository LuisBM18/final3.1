const express = require('express');
const controlValidar = require('../middlewares/validar.middleware');
const {crearProductoSchema,actualizarProductoSchema,findByProductoSchema} = require("../schemas/product.schema");
const router = express.Router();
const productoService = require('./../services/product.service');
const service = new productoService();

router.get('/',async (req, res, next)=>{
  try {
    const Producto = await service.find();
    res.status(200).json(Producto);
    } catch (error) {
      next(error)
    }
  });

router.get('/:id', controlValidar(findByProductoSchema, 'params'), async (req,res, next)=>{
  try {
    const { id } = req.params;
    const Producto = await service.finfOne(id);
    res.json(Producto);
  } catch (error) {
    next(error);
  }
});

router.post('/', controlValidar(crearProductoSchema, 'body'), async (req, res, next)=>{
  try {
    const body = req.body;
    const Producto = await service.create(body);
    res.status(201).json({
      mensaje: 'registro exitoso',
      datos: Producto
    });
  } catch (error) {
    next(error)
  }
});
router.patch('/:id',controlValidar(findByProductoSchema, 'params'), controlValidar(actualizarProductoSchema, 'body'), async (req,res, next) => {
  try {
    const { id }= req.params;
      const body = req.body;
      const Producto =await service.update(id,body);
      res.status(200).json({
        mensaje: 'Producto actualizado',
        Producto
      });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',controlValidar(findByProductoSchema, 'params'), async (req,res, next)=> {
  try {
    const {id} = req.params;
    const ProductoEliminado = await service.delete(id);
    res.json({
    mensaje :'Producto eliminado',
    ProductoEliminado
    });
  } catch (error) {
    next(error)
  }
});
module.exports = router;
