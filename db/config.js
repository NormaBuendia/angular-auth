
// para conectarme a la base de datos

const mongoose = require("mongoose");


//necsito el await, y no quiero que continue hasta que no se levante la base de datos
const dbConnection = async() => {
// coloco el try y catch por si sucese un error
try {
    // hacemos la conexion utilizando mongoose, que es un gestor
    // puedo esperar a que se resuleva esa promesa
    await mongoose.connect( process.env.BD_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true 
    } );
    
    console.log('DB Online');

} catch (error) {
    console.log(error);
    //esto evita que se levante mi base de datos, mi aplicacion de node
    // si se imprime en consolo los dos mensajes, nada va a funcionarno ni los servicios REST
    throw new Error('Error a la hora de inicializar DB');
}

}

module.exports = {
    dbConnection
}