const express = require("express");
const controlValidar = require('../middlewares/validar.middleware');
const {crearPedidoSchema,actualizarPedidoSchema,findByPedidoSchema} = require("../schemas/pedido.schema");

const PedidoService = require('../services/pedido.service')
const service = new PedidoService();
const router = express.Router();

router.get('/',async (req, res, next)=>{
  try {
    const Pedido = await service.find();
    res.status(200).json(Pedido);
    } catch (error) {
      next(error)
    }
  });

router.get('/:id', controlValidar(findByPedidoSchema, 'params'), async (req,res, next)=>{
  try {
    const { id } = req.params;
    const Pedido = await service.finfOne(id);
    res.json(Pedido);
  } catch (error) {
    next(error);
  }
});

router.post('/', controlValidar(crearPedidoSchema, 'body'), async (req, res, next)=>{
  try {
    const body = req.body;
    const pedido = await service.create(body);
    res.status(201).json({
      mensaje: 'registro exitoso',
      datos: pedido
    });
  } catch (error) {
    next(error)
  }
});
router.patch('/:id',controlValidar(findByPedidoSchema, 'params'), controlValidar(actualizarPedidoSchema, 'body'), async (req,res, next) => {
  try {
    const { id }= req.params;
      const body = req.body;
      const Pedido =await service.update(id,body);
      res.status(200).json({
        mensaje: 'Pedido actualizado',
        Pedido
      });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',controlValidar(findByPedidoSchema, 'params'), async (req,res, next)=> {
  try {
    const {id} = req.params;
    const PedidoEliminado = await service.delete(id);
    res.json({
    mensaje :'Pedido eliminado',
    PedidoEliminado
    });
  } catch (error) {
    next(error)
  }
});
module.exports = router;
