const { response } = require("express");
const User = require ('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSingIn = async (req, res = response) => {
    
    const {id_token} = req.body;

    try {

        const {email, name, picture, movile} = await googleVerify(id_token)

        let user = await User.findOne({email});

        if (!user) {
            //crear el usuario 
            const data ={
                email,
                name,
                password: '=(',
                picture,
                google: true,
                role: "Client_Role",
               
            };
          

            user = new User(data);
            await user.save();

        }

        //si el usuario esta en db

        if (!user.stateUser) {
            return res.status(401).json({
                msq:'Hable con el administrador usuario bloqueado'
            });
        }

        //generar y validar el json web token 
        //generar el JWtoken 

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
            res.status(400).json({
            msg: 'Se genero un error al momento de validar el token '
        })
    }


}

module.exports = {
    login,
    googleSingIn,
}