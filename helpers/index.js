const dbValidators = require('./dbValidators');
const generarJWT = require('./dbValidators');
const googleVerify = require('./dbValidators');
const uploadFile = require('./dbValidators');



module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile,
}