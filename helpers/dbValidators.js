const Category  = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');
const Product = require ('../models/product');

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


//validar categoria si existe el id 
const existsCategory = async (id) => {
    const validationId = await Category.findById(id);


  if(!validationId){
    throw new Error(`Ese id no es reconocido como un Id valido`)
  }
}

//validar si el id de categoria existe 
const nameCategoryExists = async(name='') => {
  //verficar si el nombre de categoria existe 

name = name.toUpperCase();

const validationName= await Category.findOne({name});


  
  if (!validationName) {
         throw new Error(`Esta categoria ya existe `)
  } 
}

// validar el id de, producto 
const existsProduct = async (id) => {
  const validationProductId = await Product.findById(id);


if(!validationProductId){
  throw new Error(`Ese id no es reconocido como un Id valido`)
}
}





module.exports = {
    roleValidator,
    emailExite,
    idUsuarioExiste,
    existsCategory,
    nameCategoryExists,
    existsProduct,
    
}