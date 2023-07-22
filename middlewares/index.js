const  validarCampos = require('../middlewares/validarCampos');
const  validarJWT  = require('../middlewares/validarJWT');
const  vadationRole = require('../middlewares/validationRole');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...vadationRole,
}