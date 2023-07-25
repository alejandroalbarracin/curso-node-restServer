const { Router}  = require ('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos')

const { login, googleSingIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio y debe ser un correo valido').isEmail(),
    check('password', 'El usuario o la contraseña no son validos.').not().isEmpty(),
    validarCampos
] ,login)

router.post('/google', [
    check('id_token', 'Debe existir un token').not().isEmpty(),
    validarCampos
] ,googleSingIn)


module.exports = router