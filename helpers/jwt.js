const jwt = require('jsonwebtoken');
const { Promise } = require('mongoose');



// cuando llamo a esta funcion, espero generar uid, name del usuario
const generarJWT = ( uid, name ) => {
    // es igual a un objeto que va a tener el uid y el name
    const payload = { uid , name};

    //creo una promesa, toda la promesa la puedo retornar inmediatamente

    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            //le coloco el tiempo de expiracion
            expiresIn: '24h'
        }, (err, token) => {
            if( err ) {
                //TODO MAL
                console.log(err);
                reject();
            } else {
                //TODO BIEN
                //cuando todo se resuleve mando 
                resolve( token )
            }
        })
    });


}

module.exports = {
    generarJWT
}