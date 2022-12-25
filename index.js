//importamos express
const express = require('express');
const { dbConnection } = require('./db/config');
const path = require('path');
//importamos cors
const cors = require('cors');
//importamos para añadir el puerto como una variable de entorno
//forma corta, con la importacion de dotenv que esta en el json, lee el archivo env
// cuando la aplicacion carga lee el archivo de env
require('dotenv').config();

//vamos a un objeto especial que existe dentro de ode que es process
//console.log( process.env );

// crear el servido/la aplicacion express
const app = express();


//**CONEXION A LA BASE DE DATOS */
dbConnection();  

//hay que pasar una configuracion para ese path estatico de mi carpeta publica
//**DIECTORIO PUBLICO */ lo pasamos por un middleware
app.use( express.static('public'))


//CORS... llamo a cors, quw es otro middleware
//aceptar peticiones que viene de un dominio conocido, asi ayudamos a la proteccion
//del backend
app.use( cors ());

// otro middleware, con la voy a poder leer toda la informacion que viene en el body
// lectura y parseo del body
//la informacion que quiero leer viene en formato json
app.use( express.json());


//rutas
//usamos un middle ware express, que es use
// cuando escribamos las ruta, vamos a importar=require  auth
app.use('/api/auth', require('./routes/auth'));


//manejar las demas rutas
//aagregamos el siguiente middleware
//dispara una funcion de flecha comun  y corriente
app.get('*',(req, res) => {
  //la respuesta es el sendfile, que cosntruyo el path donde esta el indexhtml
  // en ___dirname esta el path donde esta desplegado nuestro servidor y voy a servir
  //lo que se encuentra en la carpeta public, el index html
res.sendFile( path.resolve(__dirname, 'public/index.html'));

})

//hacemos nuestra peticion get, que veremos en postman
// cuando haga una peticion al '/' voy a ejecutar la funcion que sigue que es un callback
// para enviar la respuesta tendreamos un para de argumentos en
//los parentesis() la request, que es toda la peticion y res que es la respuesta
//app.get('/', ( req, res) => {
// voy a mandalerle un archivo json de respuesta
//    res.status(500).json({
//      ok: true,
//      msg: 'Todo salio bien',
//      uid: 1234
//    });
   //res.json({
   //ok: true,
   //msg: 'Todo salio bien',
  //uid: 1234
  //});
//});

//levanto espress, coloco el puerto 4000, luego viene un callback
// que es la funcion que se va a ejecutar cuando este levantado el servidor
// app.listen( 4000, () => {
//  console.log(`servidor corriendo en puerto ${ 4000 }`)
// });

//para usar las variables de entorno, llamo a process.env.PORT
app.listen( process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${ process.env.PORT }`)
 });