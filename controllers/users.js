const { response, request} = require ('express');


const usersGet = (req = request, res = response ) => {

    const {q,nombre, apikey} = req.query

    res.json({
        ok: true,
        msg: 'peticion get - controlador',
        q,
        nombre,
        apikey,
    })
}

const userPost = (req, res = response ) => {

    const {nombre, edad} = req.body;

    res.json({
        ok: true,
        msg: 'peticion post - controlador',
        nombre,
        edad,
    })
}

const userPut = (req, res = response ) => {

    const {id} = req.params

    res.json({
        ok: true,
        msg: 'peticion put - controlador',
        id,
    })
}

const userDelete = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'peticion Delete - controlador'
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