// creo instancias que van a estar en mi base de datos
//con U mayuscula y en singular

const { Schema, model } = require("mongoose");

// schema es una funcion que se ejecuta con ciertos argumentos
const UsuarioSchema = Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        //asi dos usuarios no podrian tener el mismo correo electronico
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UsuarioSchema );