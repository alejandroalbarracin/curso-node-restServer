const { Router}  = require ('express');
const { check } = require('express-validator');
const { uploadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollection } = require('../helpers/dbValidators');
const { validarJWT, hasRole, validarCampos, validateFileUpload } = require('../middlewares');




const router = Router();
//si quiero subir algun tipo de archivo ya sea excel pdf etc solo para subir esto no aplica para actualizar 
// no olvides asignarle permisos para que el usuario administrador sea el unico que lo pueda cargar 

router.get('/:colection/:id', [
    check('id', 'El id debe ser un id Valido').isMongoId(),
    check('colection').custom( c => allowedCollection (c, ['users', 'products']) ),
    validarCampos
], showImage )

router.post('/', [
    validateFileUpload
], uploadFiles)



router.put('/:colection/:id', [
    validateFileUpload,
    check('id', 'El id debe ser un id Valido').isMongoId(),
    check('colection').custom( c => allowedCollection (c, ['users', 'products']) ),
    validarCampos

], updateImageCloudinary)
//], updateImage)

module.exports = router

