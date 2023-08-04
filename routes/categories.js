const { Router}  = require ('express');
const { check } = require('express-validator');
const { 
    createCategory, 
    categoryGet, 
    categoryGetId, 
    putCategory, 
    deleteCategory
} = require('../controllers/categories');
const { existsCategory, nameCategoryExists } = require('../helpers/dbValidators');

const { validarJWT, hasRole, validarCampos } = require('../middlewares');


const router = Router();

//obtner todas la categorias publico 
router.get('/', categoryGet);




//obtener un categoria por id - publico
router.get('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsCategory),
    validarCampos,
    
], categoryGetId);






//crear una categoria - privado - cualquier persona con permiso user_role, admin role  con token valido 
router.post('/',[
    validarJWT,
    hasRole('super_Admin','Admin_role', 'User_Role'),
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
    
], createCategory );





//Actualizar- privado - cualquier persona que sea userRole y AdminRole y tenga un token valido 
router.put('/:id',[
    validarJWT,
    hasRole('super_Admin','Admin_role', 'User_Role'),
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('name', 'Ya existe una propiedad con ese mismo nombre').custom(nameCategoryExists),
    check('id').custom(existsCategory),
    validarCampos
], putCategory);







//Borrar una categoria - cualquiera que sea adminROle 
router.delete('/:id',[
    validarJWT,
    hasRole('super_Admin','Admin_role'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsCategory),
    validarCampos
], deleteCategory);



    


module.exports = router