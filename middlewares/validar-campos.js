// un middle es una funcion
// se creo este middle personalizado

const { response } = require("express");
const { validationResult } = require("express-validator");
// tenemos que llamar a next como argumento, 

const validarCampos = ( req, res = response, next) => {
        //creo una constante , le mando la req como argumento
const errors = validationResult( req );
//si no esta vacio
    if(!errors.isEmpty()){
    // voy a sacar la peticion, y envio un error 400
    return res.status(400).json({
        ok:false,
        errors: errors.mapped()
        });
    }
    // este next es una funcion que tenemos que llamar cuando todo suceda correctamente
    //es decir que proceda el siguiente middleware
    next();

}

module.exports = {
    validarCampos
}