const Role = require('../models/role');
const User = require('../models/user');

const roleValidator = async(role = '') => {
    const existRole =  await Role.findOne({role});
      if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`)
      }
}

const emailExite = async(email = '') => {
       //verficar si el correo existe 
    const validationEmail = await User.findOne({email});

    if (validationEmail) {
            throw new Error(`El email ${email} ya se encuentra registrado`)
        }
    
}

const idUsuarioExiste = async(id = '') => {
  //verficar si el correo existe 
const validationId= await User.findById(id);

if (!validationId) {
       throw new Error(`Ese id no esta siendo reconocido como un Id valido`)
   }

}

module.exports = {
    roleValidator,
    emailExite,
    idUsuarioExiste,
}