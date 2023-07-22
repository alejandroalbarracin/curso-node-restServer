const { response, request } = require('express');
const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay un token valido'
        })
    }

    try {
        
       const {uid} = jwt.verify(token, process.env.secretorPrivateKey);

       //leer el usuario al que le corresponde el uid 
       const user = await User.findById(uid);

       if(!user){
        return res.status(401).json({
            msg: 'Token no valido'
        })
   }

       //validar si el usuario esta activo 
       if ( !user.stateUser ) {
            return res.status(401).json({
                msg: 'El Token no es valido'
            })
       }

        req.user = user;

            
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no Valido'
        })
    }



}

module.exports = {
    validarJWT
}