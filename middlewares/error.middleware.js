function mostrarError(err, req, res, next) {
  console.log("Mostrando error")
  console.error(err);
  next(err);
}

function boomManejarError(err,req,res,next) {
  console.log("Boom error")
  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function manejarError(err, req, res, next) {
  console.log("Manejando error")
  res.status(500).json({
    mensaje: err.message,
    stack: err.stack
  });
}
module.exports = { mostrarError, boomManejarError, manejarError};
