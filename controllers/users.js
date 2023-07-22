
const { response, request} = require ('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const usersGet = async(req = request, res = response ) => {

    //const {q,nombre, apikey} = req.query
    const {limite = 10} = req.query
    const {desde = 0} = req.query
    const query = {stateUser: true}

    //const users = await User.find(query)
      //  .skip(Number(desde))
        //.limit(Number(limite));

    //const total = await User.countDocuments(query)

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        users,
    })
}

const userPost = async (req, res = response ) => {

    
    const {name, email, password, identification, movile, role} = req.body;
    //crea la instacia 
    const user = new User({name, email, password, identification, movile, role});
    
 
    

    //encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //graba en la base de datos 
    await user.save();

    res.json({
        ok: true,
        msg: 'peticion post - controlador',
        user,
    })
}

const userPut = async (req, res = response ) => {

    const {id} = req.params;
    // Le pasamos lo que no vamos actualizar en este caso sera el google y la password 
    const {_id, google, password, email, ...resto} = req.body 

    //TODO validar contra base de datos
    if (password) {
        //encriptar la contraseña 
    resto.password = bcryptjs.hashSync(password, salt);
    }

    //validar usuario 
    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        ok: true,
        msg: 'peticion put - controlador',
        user,
    })
}

const userDelete = async (req, res = response ) => {

    const {id} = req.params

    //eliminar por completo el usuario no es muy recomendable pierde integridad de lo que haya realizado dicho usuario 
    //const deleteUser = await User.findByIdAndDelete(id)
   

    const inactivo = await User.findByIdAndUpdate(id, {stateUser: false})


    res.json({
        inactivo,
        
    })
}

const userPath = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'peticion Path - controlador'
    })
}


module.exports = {
    usersGet,
    userPost,
    userPut,
    userDelete,
    userPath,

}