const { Router}  = require ('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos')

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio y debe ser un correo valido').isEmail(),
    check('password', 'El usuario o la contraseña no son validos.').not().isEmpty(),
    validarCampos
] ,login)



module.exports = router