

//desestructuro
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
//creo las rutas
// tengo que crear un usuario por eso uso post
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6}),
    // mando a llamar la funcion validarCampos cuando la ruta esta invovada
    validarCampos

], crearUsuario);






// login de usuario por eso uso post
// como argumento son( el path, un arreglo de midleware, luego el controlador de la ruta)
router.post('/', [
    //aca defino todos los middleware que necesite
    //coloco los campos como argumento, primero el email y luego el mensaje de error
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6}),
     // mando a llamar la funcion validarCampos cuando la ruta esta invovada
     validarCampos
], loginUsuario);

    // Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;