const { response } = require("express");
const jwt = require('jsonwebtoken');

// CREO UN jwt y se loo paso como middleware en la ruta (auth.js, en rutas)
const validarJWT = ( req, res = response, next)=>{
    
    // pata validar token en Postman, en los header, que vienen en el req
    const token = req.header('x-token');
    //si token no existe
    if( !token){
        return res.status(401).json({
            ok:false,
            msg:'error en el token'
        });
    }
    try {
        //esta es la validacion
        // obtengo un objeto que tiene el pailot y quiere el uid y el name
         const { uid, name }  =  jwt.verify( token, process.env.SECRET_JWT_SEED );
         // como pasamos informacion de un lado a otro, del middleware al controlador
        // la req, es la misma que va a llegar a aut.js (controllers)
         
        //*** */ aqui las establecemos
        req.uid = uid;
         req.name = name;
    } catch (error){
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'

        });
    }

    //todo ok
    next();
}

module.exports = {
    validarJWT
}