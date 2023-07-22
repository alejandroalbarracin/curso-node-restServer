const { Router}  = require ('express');
const { check } = require('express-validator');

const {hasRole,isAdminRole, validarCampos, validarJWT} = require('../middlewares');


const { roleValidator, emailExite, idUsuarioExiste } = require('../helpers/dbValidators');
const { usersGet, userPost, userPut, userDelete, userPath } = require('../controllers/users');



const router = Router();

router.get('/', usersGet)

  router.put('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('role').custom(roleValidator),
    validarCampos
  ], userPut )


  router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExite),
    check('password', 'La contraseña es obligatoria y debe ser de mas de 6 caracteres').isLength({min: 6}),
    check('identification', 'El numero de identificacion es obligatorio y debe ser numerico sin digito de verificacion').isLength({min: 8}).isNumeric(),
    check('movile', 'El numero de celular es obligatorio').isLength({min: 10}).isNumeric(),
    //check('role', 'No es un rol valido').isIn(['super_Admin', 'Admin_role', 'User_Role', 'Client_Role']),
    check('role').custom(roleValidator),

    validarCampos

  ],userPost)


  router.delete('/:id', [
    validarJWT,
    //isAdminRole,
    hasRole('super_Admin','Admin_role'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    validarCampos,
  ] , userDelete)

  router.patch('/', userPath)


module.exports = router