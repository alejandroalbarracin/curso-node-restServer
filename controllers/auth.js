const { response } = require("express");
const User = require ('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        // verificar si el email existe 

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                msg:"El usuario / contraseña no son validos"
            })
        }

        //verficar si el usuario esta activo en la DB 
        if (!user.stateUser) {
            return res.status(400).json({
                msg:"Usuario / Contraseña Invalidos"
            })
        }

        // veridicar contraseña 
        const validatePassword = bcryptjs.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                msg:'El usuario / contraseña no son validos'
            })
        }


        //generar el JWtoken 

        const token = await generarJWT(user.id);

        res.json({
            user,
            token,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Valida con el administrador hay un error "
        })
    }

    

}

module.exports = {
    login,
    
}