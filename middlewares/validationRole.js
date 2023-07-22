const { response } = require("express")


const isAdminRole = (req, res = response, next ) => {

    if(!req.user){
        
        return res.status(500).json({
            msg: 'Se esta intentando validar el role sin estar validado el token'
        })
    }

    const {role, name} = req.user;

    if(role !== 'Admin_role' && role !== 'super_Admin' ){
        return res.status(400).json({
            msg:`El usuario ${name} no cuenta con permisos suficientes para este requerimiento`
        })
    }


    next();

}

const hasRole = ( ...role ) => {


    return (req, res = response, next) => {
        
        if(!req.user){
        
            return res.status(500).json({
                msg: 'Se esta intentando validar el role sin estar validado el token'
            })
        }

        if(!role.includes(req.user.role)){
              
            return res.status(401).json({
                msg: `Para realizar esta accion debe tener permisos de ${role}`
            }) 
        }


        next();
    }



}

module.exports = {
    isAdminRole,
    hasRole
}