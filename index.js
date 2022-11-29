const express = require('express'); 
const rutas = require('./routes');

const { manejarError, mostrarError, boomManejarError } = require('./middlewares/error.middleware');

const aplicacion = express();

const port = 3500;
aplicacion.use(express.json());

rutas(aplicacion);
aplicacion.use(mostrarError);
aplicacion.use(boomManejarError);
aplicacion.use(manejarError);

aplicacion.listen(port, () =>{
  console.log("puerto activao " + port);
});

