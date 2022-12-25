//asiganamos el tipado
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT }= require('../helpers/jwt')


//creamos los controladores de nuestras rutas
//creo una constante , del callback 

const crearUsuario = async(req, res = response) => {
//cuando mandemos el body de nuestras peticiones, asi lo vamos a atrapar
//console.log( req.body);
//puedo extraer lo que hay dentro del body
const { email, name, password} = req.body;
try {
    // verificar EMAIL sino tengo un correo igula, debemos tener un usuario con un email unico
    // fineOne va a buscar a una email que sea igual al email que recibo por argumento.. arriba
    const usuario = await Usuario.findOne({ email });
    //si el usuario existe
    if( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        });

    }

    // crear usuario con el modelo
    
  const dbUser = new Usuario( req.body );

    // Hashear la contraseña
    //crear de una forma aleatoria  unos numeros, que va a ser parte
    //que va a ser parte de la validacion de mi contraseña
  const salt = bcrypt.genSaltSync(); // gensaltSyn, se va a hacer 10 vueltas para generar dichos salts
  // el password del usuario es igual al bcrypt, con el metodo sincrono y dentro de los parametros,
  //coloco el password que quiero encriptar , seguido de salt, que es la cantidad de vueltas que quiero hacer el hash 
  dbUser.password = bcrypt.hashSync( password, salt);

    //generar el json web token JWT
 const token = await generarJWT(dbUser.id, name)


    // crear usuario de base de datos db
        // para grabarlo en base de datos... puedo colocar el await para que se espere a que tenga toda la informacion
    await dbUser.save();


    //generar la respuesta exitosa
    return res.status(201).json({
        ok:true,
       uid:dbUser.id,
       name,
       email,
       // coloco el token para que sea parte de la respuesta
       token
    })

    

} catch ( error ){
  // me muestra el error en consola
    console.log(error)
    // esto se conoce como callback o  como el controlador de esta ruta
    // status 500 porque a;go interno fallo
    return res. status(500).json({
        ok:false,
        //nombre de peticion que estoy haciendo
        msg: 'Por favor hable con el administrador'
    
        });
    }
  
}

const loginUsuario= async(req, res = response) => {

//puedo extraer lo que hay dentro del body
const { email, password} = req.body;
//tenemos que validar si este email y password hacen match con algunos de nuestra base de datos
 try {

    const dbUser = await Usuario.findOne({email});
// sino tenemos un dbuser, significa que el email es incorrecto
    if(!dbUser){
    return res.status(400).json({
    ok:false,
    msg:'El correo no existe'
    });
}
//confirmar si el password hace match
//compareSync si una contrsena al encriptarla hace match con otra contrasena
// validamos el password que esta en el body con el password que esta en la base de datos
const validPassword = bcrypt.compareSync( password, dbUser.password );
 if(!validPassword){
    return res.status(400).json({
        ok:false,
        msg:'El password no es valido'
        });
 }

 //Generar el jsonwedtoken JWT
  const token = await generarJWT(dbUser.id, dbUser.name);
//respuesta del servicio
 return res.json({
    ok:true,
    uid:dbUser.id,
    name:dbUser.name,
    email: dbUser.email,
    // coloco el token para que sea parte de la respuesta
    token
 });



 } catch (error){
  console.log(error);
  return res.status(500).json( {
     ok: false,
     msg: 'hable con el administrador'
  });
 }


    
    }
//Controlador Revalidar Token
const revalidarToken = async (req, res = response) => {
    // como los obtengo aqui de la request
    //*** */ aqui las leemos
    const { uid } = req;

 // LEER LA BASE DE DATOS PARA ONTENER EL EMAIL
 // creo una constante que y es igual a await del usuario voy a buscar un id del usuario que sea igual al uid
 const dbUser = await Usuario.findById(uid);


    /* crear otro JWT */
    //Generar el jsonwedtoken JWT
    // (uid del usuario, name del usuario)
    const token = await generarJWT(uid, dbUser.name);

    // esto se conoce como callback o  como el controlador de esta ruta
     return res.json({
        ok:true,
        //nombre de peticion que estoy haciendo
       uid, 
       name:dbUser.name,
       email:dbUser.email,
       token 
    
     });
    
    }

    module.exports = {
        crearUsuario,
        loginUsuario, 
        revalidarToken
    }



