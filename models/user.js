const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El usuario es requerido']
    },
    email:{
        type: String,
        required: [true, 'El Email es requerido'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'El Password es requerido']
    },
    identification:{
        type: String,
        required: [false, 'El nit o cedula es requerido']
    },
    movile:{
        type: String,
        required: [false, 'El numero celular es requerido']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        enum: ['super_Admin', 'Admin_role', 'User_Role', 'Client_Role']
    },
    stateUser:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false
    },
    
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;

}

module.exports = model('User', UsuarioSchema)