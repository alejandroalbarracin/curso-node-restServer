const jwt = require('jsonwebtoken')



const generarJWT = ( uid = '') => {

    return new Promise ((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.secretorPrivateKey, {
            expiresIn:'8h'
        }, (err, token ) => {
            if (err) {
                console.log(err);
                reject('no se genero token')
            }else{
                resolve(token); 
            }
        })

    } )
}


module.exports = {
    generarJWT
}