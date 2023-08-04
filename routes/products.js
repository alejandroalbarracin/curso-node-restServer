const { Router}  = require ('express');
const { check } = require('express-validator');
const { createProduct, getProducts,getProductId, putProduct, deleteProduct } = require('../controllers/products');
const { existsCategory, existsProduct } = require('../helpers/dbValidators');
const { validarJWT, hasRole } = require('../middlewares');
const {validarCampos} = require('../middlewares/validarCampos')


const router = Router();

router.get('/',getProducts);

router.get('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos,

] , getProductId);

router.post('/',[
    validarJWT,
    hasRole('super_Admin','Admin_role', 'User_Role'),
    check('name', 'El nombre de la producto es obligatorio').not().isEmpty(),
    check('productCode', 'El codigo del producto es obligatorio').not().isEmpty(),
    check('category', 'el id de la categoria es obligatoria').isMongoId(),
    check('category').custom(existsCategory),
    validarCampos
], createProduct);

router.put('/:id',[
    validarJWT,
    hasRole('super_Admin','Admin_role'),
    //check('name', 'El nombre de la producto es obligatorio').not().isEmpty(),
    //check('productCode', 'El codigo del producto es obligatorio').not().isEmpty(),
    check('id').custom(existsProduct),
    check('category', 'el id de la categoria es obligatoria').isMongoId(),
    //check('category').custom(existsCategory),
    validarCampos
], putProduct);


router.delete('/:id',[
    validarJWT,
    hasRole('super_Admin','Admin_role'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
], deleteProduct)





module.exports = router