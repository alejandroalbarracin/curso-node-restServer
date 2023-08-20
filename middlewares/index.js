const  validarCampos = require('../middlewares/validarCampos');
const  validarJWT  = require('../middlewares/validarJWT');
const  vadationRole = require('../middlewares/validationRole');
const  validateFileUpload = require('../middlewares/validateFile');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...vadationRole,
    ...validateFileUpload,
}